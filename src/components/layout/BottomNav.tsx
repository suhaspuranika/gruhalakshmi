import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/beneficiaries', icon: 'group', label: 'Beneficiaries' },
  { path: '/payments', icon: 'account_balance_wallet', label: 'Payments' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      <div className="flex items-stretch px-2 pt-2 pb-5">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-1 flex-col items-center gap-0.5 py-1"
            >
              <div
                className={cn(
                  'relative w-10 h-8 flex items-center justify-center rounded-full transition-all',
                  isActive && 'bg-blue-50'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-blue-100 rounded-full"
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  />
                )}
                <span
                  className={cn(
                    'material-icons-round text-2xl relative z-10 transition-colors',
                    isActive ? 'text-[#005BAC]' : 'text-gray-400'
                  )}
                >
                  {item.icon}
                </span>
              </div>
              <span
                className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-[#005BAC]' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
