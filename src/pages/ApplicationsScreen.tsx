import { useState } from 'react';
import { motion } from 'framer-motion';
import applicationsData from '../data/applications.json';
import type { Application } from '../types';

const tabs: { key: Application['status'] | 'all'; label: string }[] = [
  { key: 'pending', label: 'Pending' },
  { key: 'approved', label: 'Approved' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'draft', label: 'Drafts' },
];

const statusStyle: Record<Application['status'], string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  approved: 'bg-green-50 text-green-700',
  rejected: 'bg-red-50 text-red-700',
  draft: 'bg-gray-100 text-gray-600',
};

export default function ApplicationsScreen() {
  const [activeTab, setActiveTab] = useState<Application['status']>('pending');
  const applications = applicationsData as Application[];
  const filtered = applications.filter(a => a.status === activeTab);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="gradient-primary px-5 pt-12 pb-14 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white mb-1">My Applications</h1>
          <p className="text-blue-200 text-sm">Fresh Gruhalakshmi applications</p>
        </div>
      </div>

      <div className="px-4 -mt-6 pb-6">
        <div className="bg-white rounded-2xl p-2 card-shadow-lg mb-4 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as Application['status'])}
              className={`flex-1 min-w-[72px] py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-[#005BAC] text-white'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-4 card-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-gray-900">{app.beneficiaryName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{app.applicationNo}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusStyle[app.status]}`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              {app.submittedAt && (
                <p className="text-xs text-gray-500">Submitted: {app.submittedAt}</p>
              )}
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <span className="material-icons-round text-gray-300 text-5xl mb-2">inbox</span>
              <p className="text-gray-500 text-sm">No {activeTab} applications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
