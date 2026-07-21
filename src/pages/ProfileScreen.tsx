import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BottomSheet from '../components/ui/BottomSheet';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import documentsData from '../data/documents.json';
import type { Document } from '../types';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { beneficiary, logout, darkMode, setDarkMode, language, setLanguage } = useApp();
  const [showLogout, setShowLogout] = useState(false);
  const docs = documentsData as Document[];

  if (!beneficiary) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

    const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person', label: 'Personal Details', color: 'text-blue-500', bg: 'bg-blue-50', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
        { icon: 'account_balance', label: 'Bank Details', color: 'text-green-500', bg: 'bg-green-50', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
        { icon: 'description', label: 'Documents', color: 'text-orange-500', bg: 'bg-orange-50', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
        { icon: 'family_restroom', label: 'Family Members', color: 'text-pink-500', bg: 'bg-pink-50', action: () => navigate('/family'), sub: undefined as string | undefined },
      ],
    },
    {
      title: 'Settings',
      items: [
        { icon: 'language', label: 'Language', color: 'text-purple-500', bg: 'bg-purple-50', sub: language === 'en' ? 'English' : 'ಕನ್ನಡ', action: undefined as (() => void) | undefined },
        { icon: 'notifications', label: 'Notifications', color: 'text-yellow-500', bg: 'bg-yellow-50', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
        { icon: 'security', label: 'Privacy & Security', color: 'text-gray-500', bg: 'bg-gray-100', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
        { icon: 'help_outline', label: 'Help & Support', color: 'text-teal-500', bg: 'bg-teal-50', action: undefined as (() => void) | undefined, sub: undefined as string | undefined },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header with profile */}
      <div className="gradient-primary px-5 pt-12 pb-20 relative overflow-hidden">
        <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-3">
            <img
              src={beneficiary.photo}
              alt={beneficiary.name}
              className="w-24 h-24 rounded-full border-4 border-white/30 bg-white/20 object-cover"
              onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${beneficiary.name}&background=fff&color=005BAC&size=96`; }}
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F58220] rounded-full flex items-center justify-center border-2 border-white shadow">
              <span className="material-icons-round text-white text-sm">camera_alt</span>
            </button>
          </div>
          <h2 className="text-xl font-black text-white">{beneficiary.name}</h2>
          <p className="text-blue-200 text-sm">{beneficiary.beneficiaryId}</p>
          <div className="flex gap-2 mt-2">
            <StatusBadge status="verified" />
            <StatusBadge status="eligible" />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 space-y-4 pb-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 card-shadow-lg"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Payments', value: '₹8,000', sub: 'Received', color: 'text-green-600' },
              { label: 'Verifications', value: '4', sub: 'Completed', color: 'text-blue-600' },
              { label: 'Documents', value: docs.filter(d => d.status === 'verified').length.toString(), sub: 'Verified', color: 'text-purple-600' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3">
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        {menuSections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.1 }}
            className="bg-white rounded-2xl p-4 card-shadow"
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="space-y-1">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <span className={`material-icons-round ${item.color} text-lg`}>{item.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                    {item.sub && <p className="text-xs text-gray-400">{item.sub}</p>}
                  </div>
                  <span className="material-icons-round text-gray-300 text-lg">chevron_right</span>
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Dark mode toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                <span className="material-icons-round text-gray-600 text-lg">{darkMode ? 'dark_mode' : 'light_mode'}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Dark Mode</p>
                <p className="text-xs text-gray-400">{darkMode ? 'Currently dark' : 'Currently light'}</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-[#005BAC]' : 'bg-gray-200'}`}
            >
              <motion.div
                animate={{ x: darkMode ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
              />
            </button>
          </div>
        </motion.div>

        {/* Language toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
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
                {lang === 'en' ? '🇬🇧 English' : '🇮🇳 ಕನ್ನಡ'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-4 card-shadow"
        >
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Uploaded Documents</h3>
          <div className="grid grid-cols-2 gap-2">
            {docs.map(doc => (
              <div key={doc.id} className="bg-gray-50 rounded-xl p-3 flex items-center gap-2">
                <span className="material-icons-round text-[#005BAC] text-lg">description</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{doc.name}</p>
                  <p className="text-[10px] text-green-600 font-medium">✓ Verified</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Logout */}
        <Button
          fullWidth size="lg" variant="danger"
          icon={<span className="material-icons-round text-xl">logout</span>}
          onClick={() => setShowLogout(true)}
        >
          Logout
        </Button>
      </div>

      {/* Logout confirm */}
      <BottomSheet isOpen={showLogout} onClose={() => setShowLogout(false)} title="Logout">
        <div className="p-5">
          <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout from your Gruhalakshmi account?</p>
          <div className="flex gap-3">
            <Button fullWidth size="lg" variant="outline" onClick={() => setShowLogout(false)}>Cancel</Button>
            <Button fullWidth size="lg" variant="danger" onClick={handleLogout}
              icon={<span className="material-icons-round text-xl">logout</span>}>
              Logout
            </Button>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
