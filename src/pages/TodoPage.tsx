import { LogOut, Plus } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { TodoItem } from '../components/TodoItem';
import { useAuth } from '../context/AuthContext';
import { useTodos } from '../context/TodoContext';

export const TodoPage = () => {
  const { todos, addTodo } = useTodos();
  const { user, logout } = useAuth();
  const [taskName, setTaskName] = useState('');

  const handleAddTopLevel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    addTodo(taskName, null);
    setTaskName('');
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-slate-500 text-sm">Welcome back, {user?.name}</p>
        </div>
        {/* FIX 1: Added type="button" to prevent this from ever acting as a submit button */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Top Level Input */}
      <form onSubmit={handleAddTopLevel} className="relative mb-8">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full pl-4 pr-12 py-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        {/* FIX 2: Added type="submit" so the form knows this is the primary action button */}
        <button
          type="submit"
          className="absolute right-3 top-3 p-1.5 bg-indigo-600 text-white rounded-md"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* The Recursive List */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p>No tasks yet. Start by adding one above!</p>
          </div>
        ) : (
          todos.map((todo) => <TodoItem key={todo.$id} todo={todo} />)
        )}
      </div>
    </div>
  );
};
