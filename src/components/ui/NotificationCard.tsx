import { motion } from 'framer-motion';
import type { Notification } from '../../types';
import { cn } from '../../lib/utils';

interface NotificationCardProps {
  notification: Notification;
  index: number;
}

const typeColors = {
  info: 'bg-blue-50 text-blue-600',
  success: 'bg-green-50 text-green-600',
  warning: 'bg-yellow-50 text-yellow-600',
  error: 'bg-red-50 text-red-600',
};

export default function NotificationCard({ notification, index }: NotificationCardProps) {
  const timeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn(
        'flex gap-3 p-4 rounded-2xl transition-colors',
        notification.read ? 'bg-white card-shadow' : 'bg-blue-50/50 border border-blue-100 card-shadow'
      )}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', typeColors[notification.type])}>
        <span className="material-icons-round text-xl">{notification.icon}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-1">
          <h4 className={cn('text-sm font-semibold', notification.read ? 'text-gray-800' : 'text-gray-900')}>
            {notification.title}
          </h4>
          {!notification.read && (
            <span className="w-2 h-2 bg-[#005BAC] rounded-full flex-shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{notification.message}</p>
        <p className="text-xs text-gray-400 mt-2">{timeAgo(notification.timestamp)}</p>
      </div>
    </motion.div>
  );
}
