import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import BottomSheet from '../components/ui/BottomSheet';
import NotificationCard from '../components/ui/NotificationCard';
import notificationsData from '../data/notifications.json';
import type { Notification } from '../types';
import govtlogo from '../assets/govtlogo.png';
import logo from '../assets/logo.png';
import govtApp1 from '../assets/1.jpg';
import govtApp2 from '../assets/2.jpg';

const menuItems = [
  { icon: 'assignment', label: 'Fresh Gruhalakshmi Application', path: '/application/fresh', color: 'bg-orange-50', iconColor: 'text-orange-500' },
  { icon: 'person_add', label: 'Add Beneficiary', path: '/beneficiaries/add', color: 'bg-pink-50', iconColor: 'text-pink-500' },
  { icon: 'group', label: 'Beneficiaries', path: '/beneficiaries', color: 'bg-blue-50', iconColor: 'text-blue-500' },
  { icon: 'badge', label: 'Existing Beneficiary KYC', path: '/kyc/existing', color: 'bg-purple-50', iconColor: 'text-purple-500' },
  { icon: 'account_balance_wallet', label: 'Payment Status', path: '/payments', color: 'bg-green-50', iconColor: 'text-green-500' },
  { icon: 'description', label: 'My Applications', path: '/applications', color: 'bg-teal-50', iconColor: 'text-teal-500' },
  { icon: 'person', label: 'Profile', path: '/profile', color: 'bg-gray-100', iconColor: 'text-gray-600' },
];

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { user, beneficiaries } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notificationsData.filter(n => !n.read).length;
  const pendingKyc = beneficiaries.filter(b => b.applicationStatus === 'kyc_pending');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Compact blue header */}
      <div className="gradient-primary px-5 pt-10 pb-8 relative overflow-hidden">
        <motion.div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10">
          {/* Top row: Govt of Karnataka label + notification bell */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <img src={govtlogo} alt="Govt of Karnataka" className="w-7 h-7 object-contain" />
              <p className="text-white/90 text-xs font-semibold tracking-wide">Government of Karnataka</p>
            </div>
            <button
              onClick={() => setShowNotifications(true)}
              className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <span className="material-icons-round text-white text-xl">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F58220] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Logo row: 1.png | logo.png | 2.jpg — all in one compact line */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <motion.button whileTap={{ scale: 0.92 }} className="w-12 h-12 rounded-xl overflow-hidden bg-white/20 border border-white/30 shadow-md flex-shrink-0">
              <img src={govtApp1} alt="App 1" className="w-full h-full object-cover" />
            </motion.button>

            <div className="bg-white rounded-xl px-3 py-2 shadow-lg shadow-black/15 flex-shrink-0">
              <img src={logo} alt="Gruhalakshmi" className="h-12 w-auto object-contain" />
            </div>

            <motion.button whileTap={{ scale: 0.92 }} className="w-12 h-12 rounded-xl overflow-hidden bg-white/20 border border-white/30 shadow-md flex-shrink-0">
              <img src={govtApp2} alt="App 2" className="w-full h-full object-cover" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* White content area with Total Beneficiaries at top */}
      <div className="relative z-20 px-4 -mt-6 space-y-3 pb-4">
        {/* Total Beneficiaries — compact inline chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl px-4 py-3 card-shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
              <span className="material-icons-round text-[#005BAC] text-lg">group</span>
            </div>
            <span className="text-sm font-semibold text-gray-600">Total Beneficiaries</span>
          </div>
          <span className="text-2xl font-black text-[#005BAC]">{beneficiaries.length}</span>
        </motion.div>
        {pendingKyc.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 card-shadow-lg"
          >
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 mb-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-icons-round text-orange-500 text-xl">warning</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-orange-800">
                    KYC Pending · {pendingKyc.length === 1
                      ? '1 beneficiary'
                      : `${pendingKyc.length} beneficiaries`}
                  </p>
                  <p className="text-xs text-orange-600 mt-0.5">
                    Complete face verification so payment can be processed
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {pendingKyc.map(b => (
                      <span
                        key={b.id}
                        className="inline-flex items-center gap-1 bg-white/80 text-orange-700 text-xs font-semibold px-2 py-1 rounded-lg"
                      >
                        <span className="material-icons-round text-orange-400" style={{ fontSize: 12 }}>person</span>
                        {b.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button
              fullWidth
              size="lg"
              variant="secondary"
              icon={<span className="material-icons-round text-xl">face</span>}
              onClick={() => navigate('/kyc/existing')}
            >
              Complete KYC Now
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: pendingKyc.length > 0 ? 0.1 : 0 }}
          className="bg-white rounded-3xl p-2 card-shadow-lg"
        >
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 p-3.5 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-11 h-11 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <span className={`material-icons-round ${item.iconColor} text-xl`}>{item.icon}</span>
              </div>
              <span className="flex-1 text-left text-sm font-semibold text-gray-800">{item.label}</span>
              <span className="material-icons-round text-gray-300 text-lg">chevron_right</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <BottomSheet isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications" height="half">
        <div className="p-4 space-y-3">
          {(notificationsData as Notification[]).map((n, i) => (
            <NotificationCard key={n.id} notification={n} index={i} />
          ))}
        </div>
      </BottomSheet>
    </div>
  );
}
