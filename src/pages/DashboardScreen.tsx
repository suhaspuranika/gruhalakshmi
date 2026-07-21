import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { getGreeting, formatCurrency } from '../lib/utils';
import StatusBadge from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import notificationsData from '../data/notifications.json';
import paymentsData from '../data/payments.json';
import BottomSheet from '../components/ui/BottomSheet';
import NotificationCard from '../components/ui/NotificationCard';
import type { Notification } from '../types';

const quickActions = [
  { icon: 'family_restroom', label: 'Family', path: '/family', color: 'bg-pink-50', iconColor: 'text-pink-500' },
  { icon: 'account_balance_wallet', label: 'Payments', path: '/payments', color: 'bg-green-50', iconColor: 'text-green-500' },
  { icon: 'description', label: 'Documents', path: '/dashboard', color: 'bg-orange-50', iconColor: 'text-orange-500' },
  { icon: 'person', label: 'Profile', path: '/profile', color: 'bg-purple-50', iconColor: 'text-purple-500' },
];

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { beneficiary } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notificationsData.filter(n => !n.read).length;
  const latestPayment = paymentsData.find(p => p.status === 'released');

  if (!beneficiary) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-20 relative overflow-hidden">
        <motion.div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/5"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-white/5"
          animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 10, repeat: Infinity }} />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm font-medium">{getGreeting()},</p>
              <h1 className="text-xl font-black text-white">{beneficiary.name.split(' ')[0]} 👋</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"
              >
                <span className="material-icons-round text-white text-xl">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F58220] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button onClick={() => navigate('/profile')}>
                <img
                  src={beneficiary.photo}
                  alt={beneficiary.name}
                  className="w-10 h-10 rounded-xl bg-white/20 object-cover border-2 border-white/30"
                  onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${beneficiary.name}&background=fff&color=005BAC`; }}
                />
              </button>
            </div>
          </div>

          {/* Beneficiary ID */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-2">
            <span className="material-icons-round text-blue-200 text-sm">badge</span>
            <p className="text-blue-100 text-xs">Beneficiary ID: <strong className="text-white">{beneficiary.beneficiaryId}</strong></p>
          </div>
        </div>
      </div>

      {/* Content overlay on header */}
      <div className="px-4 -mt-12 space-y-4 pb-4">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-5 card-shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-8 translate-x-8 opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Account Status</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status="verified" />
                  <StatusBadge status="eligible" />
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <span className="material-icons-round text-green-600 text-2xl">verified_user</span>
              </div>
            </div>

            {/* Verification due */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-icons-round text-orange-500 text-sm">access_time</span>
                <p className="text-xs font-bold text-orange-700">Monthly Verification Due</p>
              </div>
              <p className="text-sm font-black text-orange-800">{beneficiary.verificationDue}</p>
              <p className="text-xs text-orange-500 mt-0.5">Complete face verification to receive payment</p>
            </div>

            {/* CTA */}
            <Button
              fullWidth size="xl" variant="primary"
              icon={<span className="material-icons-round text-xl">face</span>}
              onClick={() => navigate('/verification')}
            >
              VERIFY NOW
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <h3 className="font-bold text-gray-800 text-sm mb-3">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => navigate(action.path)}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.color} flex items-center justify-center`}>
                  <span className={`material-icons-round ${action.iconColor} text-2xl`}>{action.icon}</span>
                </div>
                <p className="text-xs font-semibold text-gray-600">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Latest Payment */}
        {latestPayment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-4 card-shadow"
            onClick={() => navigate('/payments')}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800 text-sm">Latest Payment</h3>
              <button className="text-xs text-[#005BAC] font-semibold flex items-center gap-1" onClick={() => navigate('/payments')}>
                View All <span className="material-icons-round text-sm">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-4 bg-green-50 rounded-2xl p-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <span className="material-icons-round text-green-600 text-2xl">account_balance_wallet</span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">{latestPayment.month} {latestPayment.year}</p>
                <p className="text-2xl font-black text-green-600">{formatCurrency(latestPayment.amount)}</p>
                <p className="text-xs text-green-500 font-medium">Credited on {latestPayment.date}</p>
              </div>
              <StatusBadge status="released" />
            </div>
          </motion.div>
        )}

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <h3 className="font-bold text-gray-800 text-sm mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-50', text: 'Payment ₹2,000 credited', time: '15 Jul 2026', sub: 'July installment released' },
              { icon: 'face', color: 'text-blue-500', bg: 'bg-blue-50', text: 'Face Verification Completed', time: '10 Jul 2026', sub: '98.7% match score' },
              { icon: 'verified', color: 'text-purple-500', bg: 'bg-purple-50', text: 'KYC Verified', time: '01 Jun 2026', sub: 'Aadhaar eKYC successful' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-icons-round ${item.color} text-lg`}>{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">{item.text}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Notifications Sheet */}
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
