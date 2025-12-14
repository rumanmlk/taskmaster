import type { Task, User } from '@/app/types';

interface UserSelectorProps {
  users: User[];
  selectedUser: string;
  onSelectUser: (userId: string) => void;
  tasks: Task[];
}

export default function UserSelector({ users, selectedUser, onSelectUser, tasks }: UserSelectorProps) {
  const stats = {
    total: tasks.filter(t => t.userId === selectedUser).length,
    completed: tasks.filter(t => t.userId === selectedUser && t.completed).length,
    active: tasks.filter(t => t.userId === selectedUser && !t.completed).length
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <select
        value={selectedUser}
        onChange={(e) => onSelectUser(e.target.value)}
        className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900 font-medium"
      >
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name || user.email}
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className="flex gap-4 text-sm">
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
            Total: {stats.total}
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
            Completed: {stats.completed}
          </div>
          <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-semibold">
            Active: {stats.active}
          </div>
        </div>
      )}
    </div>
  );
}