import { type Todo } from '../types/todo';
import { useTodos } from '../context/TodoContext';
import { useState } from 'react';
import { ChevronRight, Plus, Trash } from 'lucide-react';

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { addTodo, deleteTodo, toggleTodo } = useTodos();
  const [newSubTask, setNewSubTask] = useState('');

  return (
    <div className="ml-6 border-l pl-4 my-2">
      <div className="flex items-center gap-2 group">
        <input
          type="checkbox"
          // Ensure we use 'checked' for controlled components
          checked={todo.isCompleted}
          // Use onChange to trigger the toggle
          onChange={() => toggleTodo(todo.$id, todo.isCompleted)}
          // Add a cursor-pointer for better UX
          className="w-5 h-5 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
        />
        <span className={todo.isCompleted ? 'line-through text-gray-400' : ''}>
          {todo.content}
        </span>
        <button
          onClick={() => deleteTodo(todo.$id)}
          className="opacity-0 group-hover:opacity-100 text-red-500"
        >
          <Trash size={14} />
        </button>
      </div>

      {/* Recursive Children */}
      {todo.children?.map((child) => (
        <TodoItem key={child.$id} todo={child} />
      ))}

      {/* Add Sub-task Input */}
      <div className="flex items-center mt-1">
        <Plus size={14} className="text-gray-400" />
        <input
          className="text-sm bg-transparent outline-none ml-2 border-b border-transparent focus:border-gray-300"
          placeholder="Add sub-task..."
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              addTodo(newSubTask, todo.$id);
              setNewSubTask('');
            }
          }}
        />
      </div>
    </div>
  );
};
