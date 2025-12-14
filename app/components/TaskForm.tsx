import type { Priority } from '@/app/types';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface CreateTaskData {
  title: string;
  description?: string | null;
  priority: Priority;
  dueDate?: string | null;
  userId: string;
}

interface TaskFormProps {
  selectedUser: string;
  onCreateTask: (taskData: CreateTaskData) => Promise<void>;
}

export default function TaskForm({ selectedUser, onCreateTask }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as Priority,
    dueDate: ''
  });

  const handleSubmit = async () => {
    if (!formData.title.trim() || !selectedUser) return;

    await onCreateTask({
      title: formData.title,
      description: formData.description || null,
      priority: formData.priority,
      dueDate: formData.dueDate || null,
      userId: selectedUser
    });

    setFormData({
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Plus size={24} />
        New Task
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-500 font-medium"
        />
        <textarea
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-white text-gray-900 placeholder:text-gray-500"
          rows={3}
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 font-medium"
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
          <option value="URGENT">Urgent</option>
        </select>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 font-medium"
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedUser}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
        >
          Add Task
        </button>
        {!selectedUser && (
          <p className="text-sm text-red-600 text-center font-medium">Please select a user first</p>
        )}
      </div>
    </div>
  );
}