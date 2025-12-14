import type { CreateUserData } from '@/app/types';
import { useState } from 'react';

interface UserFormProps {
  onCreateUser: (userData: CreateUserData) => Promise<void>;
  onCancel: () => void;
}

export default function UserForm({ onCreateUser, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserData>({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.password) {
      await onCreateUser(formData);
      setFormData({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-900">Create New User</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-gray-900 placeholder:text-gray-500"
        />
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Create User
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}