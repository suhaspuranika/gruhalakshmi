import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'verified' | 'pending' | 'rejected' | 'eligible' | 'not-eligible' | 'released' | 'processing' | 'failed' | 'uploaded';
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig = {
  verified: { label: 'Verified', color: 'bg-green-100 text-green-700', icon: 'check_circle' },
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', icon: 'schedule' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: 'cancel' },
  eligible: { label: 'Eligible', color: 'bg-blue-100 text-blue-700', icon: 'verified' },
  'not-eligible': { label: 'Not Eligible', color: 'bg-gray-100 text-gray-600', icon: 'remove_circle' },
  released: { label: 'Released', color: 'bg-green-100 text-green-700', icon: 'check_circle' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700', icon: 'autorenew' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: 'error' },
  uploaded: { label: 'Uploaded', color: 'bg-green-100 text-green-700', icon: 'cloud_done' },
};

export default function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full',
        config.color,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs',
        className
      )}
    >
      <span className={cn('material-icons-round', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {config.icon}
      </span>
      {config.label}
    </span>
  );
}
