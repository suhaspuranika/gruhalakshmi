import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/dashboard', icon: 'home', label: 'Home' },
  { path: '/family', icon: 'group', label: 'Family' },
  { path: '/payments', icon: 'account_balance_wallet', label: 'Payments' },
  { path: '/profile', icon: 'person', label: 'Profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100"
         style={{ maxWidth: '430px', margin: '0 auto' }}>
      <div className="flex items-end px-2 pt-2 pb-5 relative">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          // Insert FAB gap after 2nd item
          const insertFab = idx === 2;

          return (
            <div key={item.path} className={cn('flex flex-1 flex-col', insertFab && 'ml-16')}>
              <button
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-0.5 py-1 w-full"
              >
                <div className={cn(
                  'relative w-10 h-8 flex items-center justify-center rounded-full transition-all',
                  isActive && 'bg-blue-50'
                )}>
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
                <span className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-[#005BAC]' : 'text-gray-400'
                )}>
                  {item.label}
                </span>
              </button>
            </div>
          );
        })}

        {/* Floating Center FAB */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate('/verification')}
            className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-lg shadow-blue-300/60"
          >
            <span className="material-icons-round text-white text-2xl">face</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
