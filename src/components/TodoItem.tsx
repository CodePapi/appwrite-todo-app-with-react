import { Plus, Trash } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { type Todo } from '../types/todo';

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { addTodo, deleteTodo, toggleTodo } = useTodos();
  const [newSubTask, setNewSubTask] = useState('');

  const handleAddSubTask = () => {
    if (!newSubTask.trim()) return;
    addTodo(newSubTask, todo.$id);
    setNewSubTask('');
  };

  return (
    <div className="ml-6 border-l pl-4 my-2">
      <div className="flex items-center gap-2 group">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.$id, todo.isCompleted)}
          className="w-5 h-5 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all"
        />
        <span
          className={
            todo.isCompleted
              ? 'line-through text-gray-400 font-medium'
              : 'font-medium text-slate-700'
          }
        >
          {todo.content}
        </span>

        {/* FIX 1: Explicitly set type="button" */}
        <button
          type="button"
          onClick={() => deleteTodo(todo.$id)}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity p-1"
          aria-label={`Delete task: ${todo.content}`}
        >
          <Trash size={14} />
        </button>
      </div>

      {/* Recursive Children */}
      {todo.children?.map((child) => (
        <TodoItem key={child.$id} todo={child} />
      ))}

      {/* Add Sub-task Input */}
      <div className="flex items-center mt-1 ml-1">
        <Plus size={14} className="text-gray-400" />
        <input
          className="text-sm bg-transparent outline-none ml-2 border-b border-transparent focus:border-gray-300 w-full py-1"
          placeholder="Add sub-task..."
          value={newSubTask}
          onChange={(e) => setNewSubTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddSubTask();
            }
          }}
        />
      </div>
    </div>
  );
};
