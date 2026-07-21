import { motion } from 'framer-motion';
import type { FamilyMember } from '../../types';
import StatusBadge from './StatusBadge';
import { cn } from '../../lib/utils';

interface FamilyCardProps {
  member: FamilyMember;
  index: number;
  onClick?: () => void;
}

export default function FamilyCard({ member, index, onClick }: FamilyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 p-4 bg-white rounded-2xl card-shadow',
        onClick && 'cursor-pointer active:scale-[0.98] transition-transform'
      )}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src={member.photo}
          alt={member.name}
          className="w-14 h-14 rounded-full object-cover bg-blue-50"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=005BAC&color=fff`;
          }}
        />
        {member.faceRegistered && (
          <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <span className="material-icons-round text-white text-xs">check</span>
          </span>
        )}
        {member.isHead && (
          <span className="absolute -top-0.5 -right-0.5 text-base">👑</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-bold text-gray-900 text-sm">{member.name}</span>
          {onClick && (
            <span className="material-icons-round text-gray-300 text-lg">chevron_right</span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-2">{member.relationship} • Age {member.age}</p>
        <div className="flex items-center gap-2">
          <StatusBadge
            status={member.eligibility === 'eligible' ? 'eligible' :
                    member.eligibility === 'not-eligible' ? 'not-eligible' : 'pending'}
            size="sm"
          />
          <StatusBadge status={member.status === 'verified' ? 'verified' : 'pending'} size="sm" />
        </div>
      </div>
    </motion.div>
  );
}
