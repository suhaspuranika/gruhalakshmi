import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BottomSheet from '../components/ui/BottomSheet';
import Button from '../components/ui/Button';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, logout, language, setLanguage, beneficiaries } = useApp();
  const [showLogout, setShowLogout] = useState(false);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="gradient-primary px-5 pt-12 pb-20 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={user.photo}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/20 object-cover mb-3"
            onError={e => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.name}&background=fff&color=005BAC&size=96`;
            }}
          />
          <h2 className="text-xl font-black text-white">My Profile</h2>
          <p className="text-blue-200 text-sm">Account Holder</p>
        </div>
      </div>

      <div className="relative z-20 px-4 -mt-8 space-y-4 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 card-shadow-lg space-y-3"
        >
          {[
            { icon: 'badge', label: 'Name', value: user.name },
            { icon: 'phone', label: 'Mobile', value: user.mobile },
            { icon: 'email', label: 'Email', value: user.email || 'Not set' },
            { icon: 'group', label: 'Beneficiaries', value: `${beneficiaries.length} managed` },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 p-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="material-icons-round text-[#005BAC] text-lg">{item.icon}</span>
              </div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Language</p>
          <div className="flex gap-2">
            {(['en', 'kn'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  language === lang
                    ? 'bg-[#005BAC] text-white border-[#005BAC]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {lang === 'en' ? 'English' : 'ಕನ್ನಡ'}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Settings</p>
          {[
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'security', label: 'Privacy & Security' },
            { icon: 'help_outline', label: 'Help & Support' },
          ].map(item => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <span className="material-icons-round text-gray-400 text-lg">{item.icon}</span>
              <span className="flex-1 text-left text-sm font-semibold text-gray-800">{item.label}</span>
              <span className="material-icons-round text-gray-300 text-lg">chevron_right</span>
            </button>
          ))}
        </motion.div>

        <Button
          fullWidth
          size="lg"
          variant="danger"
          icon={<span className="material-icons-round text-xl">logout</span>}
          onClick={() => setShowLogout(true)}
        >
          Logout
        </Button>
      </div>

      <BottomSheet isOpen={showLogout} onClose={() => setShowLogout(false)} title="Logout">
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to logout from your account?
          </p>
          <div className="flex gap-3">
            <Button fullWidth size="lg" variant="outline" onClick={() => setShowLogout(false)}>
              Cancel
            </Button>
            <Button
              fullWidth
              size="lg"
              variant="danger"
              onClick={handleLogout}
              icon={<span className="material-icons-round text-xl">logout</span>}
            >
              Logout
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
