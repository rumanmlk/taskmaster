import type { Task } from '@/app/types';
import { useEffect, useState } from 'react';

export interface CreateTaskData {
  title: string;
  description?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string | null;
  userId: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        
        if (!res.ok) {
          console.error('API Error:', res.status, res.statusText);
          setLoading(false);
          return;
        }

        const text = await res.text();
        if (!text) {
          console.log('No tasks found, starting with empty array');
          setTasks([]);
          setLoading(false);
          return;
        }

        const data = JSON.parse(text);
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const createTask = async (taskData: CreateTaskData) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      
      if (!res.ok) {
        console.error('Failed to create task:', res.status);
        return;
      }
      
      const task = await res.json();
      setTasks(prevTasks => [task, ...prevTasks]);
      return task;
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      
      if (!res.ok) {
        console.error('Failed to toggle task:', res.status);
        return;
      }
      
      setTasks(prevTasks =>
        prevTasks.map(t => t.id === taskId ? { ...t, completed: !completed } : t)
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        console.error('Failed to delete task:', res.status);
        return;
      }
      
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return { tasks, loading, createTask, toggleTask, deleteTask };
}