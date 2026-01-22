export interface Todo {
  $id: string;
  content: string;
  isCompleted: boolean;
  parentId: string | null;
  userId: string;
  createdAt: string;
  children?: Todo[];
}

export interface TodoContextType {
  todos: Todo[];
  addTodo: (content: string, parentId?: string | null) => Promise<void>;
  toggleTodo: (id: string, isCompleted: boolean) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}
