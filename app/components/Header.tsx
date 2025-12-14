import { CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onNewUser: () => void;
  showNewUserForm: boolean;
}

export default function Header({ onNewUser, showNewUserForm }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-2">
          <CheckCircle2 className="text-indigo-600" size={36} />
          TaskMaster
        </h1>
        <p className="text-gray-600 mt-1">Organize your tasks, achieve your goals</p>
      </div>
      <button
        onClick={onNewUser}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        {showNewUserForm ? 'Cancel' : 'New User'}
      </button>
    </div>
  );
}