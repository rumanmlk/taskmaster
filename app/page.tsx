'use client';

import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserSelector from './components/UserSelector';
import { useTasks } from './hooks/useTasks';
import { useUsers } from './hooks/useUsers';

export default function TaskMaster() {
  const { tasks, loading, createTask, toggleTask, deleteTask } = useTasks();
  const { users, selectedUser, setSelectedUser, createUser } = useUsers();
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const handleCreateUser = async (userData: { name: string; email: string; password: string }) => {
    await createUser(userData);
    setShowNewUserForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading TaskMaster...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <Header
            onNewUser={() => setShowNewUserForm(!showNewUserForm)}
            showNewUserForm={showNewUserForm}
          />

          {showNewUserForm && (
            <UserForm
              onCreateUser={handleCreateUser}
              onCancel={() => setShowNewUserForm(false)}
            />
          )}

          <UserSelector
            users={users}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
            tasks={tasks}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Form */}
          <div className="lg:col-span-1">
            <TaskForm selectedUser={selectedUser} onCreateTask={createTask} />
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <TaskList
              tasks={tasks}
              selectedUser={selectedUser}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}