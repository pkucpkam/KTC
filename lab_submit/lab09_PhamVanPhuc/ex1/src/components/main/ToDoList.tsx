import React, { useState, useEffect } from 'react';
import { todoService } from '../services/todoService';
import type { Todo } from '../types/Todo.types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getAll();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải danh sách công việc');
        console.error('Error fetching todos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTitle.trim()) {
      setError('Vui lòng nhập tiêu đề công việc');
      return;
    }
    try {
      const todos = await todoService.getAll();
      if (todos.some((t) => t.title.toLowerCase() === newTitle.toLowerCase())) {
        setError('Tên công việc đã tồn tại');
        return;
      }
      const newTodo = {
        title: newTitle,
        description: '',
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const createdTodo = await todoService.create(newTodo);
      setTodos([...todos, createdTodo]);
      setNewTitle('');
      setError(null);
    } catch (err) {
      setError('Không thể thêm công việc');
      console.error('Error adding todo:', err);
    }
  };

  if (loading) {
    return <div >Đang tải...</div>;
  }

  if (error) {
    return <div >Lỗi: {error}</div>;
  }

  return (
    <div >
      <h2 >Todo List</h2>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />       
      </div>
      <div style={{ marginTop: '16px' }}>
        <button
          onClick={handleAddTodo}
        >
          Submit
        </button>
      </div>
      <div>
        <ul style={{ paddingLeft: '20px', marginTop: '20px' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{ 
                marginBottom: '12px',
                listStyleType: 'disc'
              }}
            >
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>
                {todo.title}
              </h3>
              {todo.description && (
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  {todo.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
