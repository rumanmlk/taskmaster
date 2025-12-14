import type { Priority, Task } from '@/app/types';
import { AlertCircle, Filter } from 'lucide-react';
import { useState } from 'react';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  selectedUser: string;
  onToggleTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

export default function TaskList({ tasks, selectedUser, onToggleTask, onDeleteTask }: TaskListProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'all' ||
      (filterStatus === 'active' && !task.completed) ||
      (filterStatus === 'completed' && task.completed);
    const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
    const userMatch = !selectedUser || task.userId === selectedUser;
    return statusMatch && priorityMatch && userMatch;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-700" />
          <span className="text-sm font-bold text-gray-900">Filters:</span>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'completed')}
          className="px-3 py-1 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 font-medium"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value as Priority | 'all')}
          className="px-3 py-1 border-2 border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 font-medium"
        >
          <option value="all">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      {/* Task Items */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <AlertCircle size={48} className="mx-auto mb-3 opacity-50" />
            <p className="text-lg font-semibold">No tasks found</p>
            <p className="text-sm">Create your first task to get started!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}