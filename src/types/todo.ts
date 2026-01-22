export interface Todo {
  $id: string;
  content: string;
  isCompleted: boolean;
  parentId: string | null; // Null means it's a top-level task
  userId: string;
  createdAt: string;
  children?: Todo[]; // For local UI nesting
}
