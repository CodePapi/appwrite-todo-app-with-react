import React, { createContext, useContext, useState, useEffect } from 'react';
import { databases, TODO_CONFIG, Query, ID, account } from '../lib/appwrite';
import { type Todo } from '../types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (content: string, parentId?: string | null) => Promise<void>;
  toggleTodo: (id: string, isCompleted: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Helper to turn flat Appwrite list into a tree
  const buildTree = (flatList: Todo[]): Todo[] => {
    const map = new Map<string, Todo>();
    const roots: Todo[] = [];

    flatList.forEach(item => map.set(item.$id, { ...item, children: [] }));
    flatList.forEach(item => {
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children!.push(map.get(item.$id)!);
      } else {
        roots.push(map.get(item.$id)!);
      }
    });
    return roots;
  };

  const fetchTodos = async () => {
    const response = await databases.listDocuments(TODO_CONFIG.databaseId, TODO_CONFIG.collectionId);
    setTodos(buildTree(response.documents as unknown as Todo[]));
  };

  const addTodo = async (content: string, parentId: string | null = null) => {
    await databases.createDocument(TODO_CONFIG.databaseId, TODO_CONFIG.collectionId, ID.unique(), {
      content,
      parentId,
      isCompleted: false,
      userId: (await account.get()).$id
    });
    fetchTodos();
  };



// src/context/TodoContext.tsx

const toggleTodo = async (id: string, isCompleted: boolean) => {
  const newStatus = !isCompleted;

  // 1. OPTIMISTIC UPDATE: Update local state immediately
  setTodos((prevTodos) => {
    const updateInTree = (list: Todo[]): Todo[] => {
      return list.map((todo) => {
        if (todo.$id === id) {
          return { ...todo, isCompleted: newStatus };
        }
        if (todo.children) {
          return { ...todo, children: updateInTree(todo.children) };
        }
        return todo;
      });
    };
    return updateInTree(prevTodos);
  });

  // 2. BACKGROUND UPDATE: Tell Appwrite
  try {
    await databases.updateDocument(
      TODO_CONFIG.databaseId, 
      TODO_CONFIG.collectionId, 
      id, 
      { isCompleted: newStatus }
    );
  } catch (error) {
    console.error("Failed to sync status with server:", error);
    // 3. ROLLBACK (Optional): You could fetchTodos() here to revert UI if it fails
    fetchTodos(); 
  }
};

  
  const deleteTodo = async (id: string) => {
    try {
      await databases.deleteDocument(TODO_CONFIG.databaseId, TODO_CONFIG.collectionId, id);
      await fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodos must be used within TodoProvider');
  return context;
};