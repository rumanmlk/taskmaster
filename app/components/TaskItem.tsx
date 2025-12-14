import { Priority, Task } from '@/app/types';
import { Calendar, CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'LOW': return 'text-green-600 bg-green-50 border-green-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'URGENT': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  return (
    <div
      className={`border-l-4 ${task.completed ? 'border-green-500 bg-gray-50' : 'border-indigo-500'} bg-white p-4 rounded-lg shadow hover:shadow-md transition`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id, task.completed)}
          className="mt-1 shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 className="text-green-600" size={24} />
          ) : (
            <Circle className="text-gray-400 hover:text-indigo-600" size={24} />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Calendar size={14} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
            {task.user && (
              <span className="text-xs text-gray-500">
                @{task.user.name || task.user.email}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="shrink-0 text-red-500 hover:text-red-700 transition"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}