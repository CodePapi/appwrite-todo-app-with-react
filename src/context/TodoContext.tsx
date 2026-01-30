import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ID, TODO_CONFIG, account, databases } from '../lib/appwrite';
import { type Todo, type TodoContextType } from '../types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);
const buildTree = (flatList: Todo[]): Todo[] => {
  const map = new Map<string, Todo>();
  const roots: Todo[] = [];

  for (const item of flatList) {
    map.set(item.$id, { ...item, children: [] });
  }

  for (const item of flatList) {
    const currentItem = map.get(item.$id);
    if (!currentItem) continue;

    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId);
      if (parent?.children) {
        parent.children.push(currentItem);
      }
    } else {
      roots.push(currentItem);
    }
  }
  return roots;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await databases.listDocuments(
        TODO_CONFIG.databaseId,
        TODO_CONFIG.collectionId,
      );
      const userId = (await account.get()).$id;
      const TodosData = response.documents.filter(
        (todo) => todo.userId === userId,
      );
      setTodos(buildTree(TodosData.reverse() as unknown as Todo[]));
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  }, []);

  const addTodo = async (content: string, parentId: string | null = null) => {
    await databases.createDocument(
      TODO_CONFIG.databaseId,
      TODO_CONFIG.collectionId,
      ID.unique(),
      {
        content,
        parentId,
        isCompleted: false,
        userId: (await account.get()).$id,
      },
    );
    fetchTodos();
  };

  const toggleTodo = async (id: string, isCompleted: boolean) => {
    const newStatus = !isCompleted;
    setTodos((prevTodos) => {
      const updateInTree = (list: Todo[]): Todo[] => {
        return list.map((todo) => {
          if (todo.$id === id) {
            return { ...todo, isCompleted: newStatus };
          }
          if (todo.children && todo.children.length > 0) {
            return { ...todo, children: updateInTree(todo.children) };
          }
          return todo;
        });
      };
      return updateInTree(prevTodos);
    });

    try {
      await databases.updateDocument(
        TODO_CONFIG.databaseId,
        TODO_CONFIG.collectionId,
        id,
        { isCompleted: newStatus },
      );
    } catch (error) {
      console.error('Failed to sync status with server:', error);
      fetchTodos();
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await databases.deleteDocument(
        TODO_CONFIG.databaseId,
        TODO_CONFIG.collectionId,
        id,
      );
      await fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

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
