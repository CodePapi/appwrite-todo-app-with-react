import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TodoItem } from './TodoItem';
import { TodoProvider } from '../context/TodoContext';

const mockTodo = {
  $id: '123',
  content: 'Parent Task',
  isCompleted: false,
  parentId: null,
  children: [
    { $id: '456', content: 'Child Task', isCompleted: false, parentId: '123', children: [] }
  ]
};

describe('TodoItem Component', () => {
  it('renders parent and nested child tasks', () => {
    render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );
    
    expect(screen.getByText('Parent Task')).toBeInTheDocument();
    expect(screen.getByText('Child Task')).toBeInTheDocument();
  });

  it('contains a delete button with the correct aria-label', () => {
    render(
      <TodoProvider>
        <TodoItem todo={mockTodo} />
      </TodoProvider>
    );
    
    const deleteBtn = screen.getByLabelText(/delete task: parent task/i);
    expect(deleteBtn).toBeInTheDocument();
  });
});