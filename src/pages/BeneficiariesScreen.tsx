import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import BottomSheet from '../components/ui/BottomSheet';
import Button from '../components/ui/Button';
import type { ManagedBeneficiary } from '../types';

const statusLabel: Record<ManagedBeneficiary['applicationStatus'], { text: string; sub?: string; color: string; bg: string }> = {
  submitted: { text: 'Application Submitted', color: 'text-blue-700', bg: 'bg-blue-50' },
  kyc_pending: { text: 'KYC Pending', color: 'text-orange-700', bg: 'bg-orange-50' },
  eligible_not_applied: { text: 'Eligible', sub: 'Not Applied', color: 'text-green-700', bg: 'bg-green-50' },
  approved: { text: 'Approved', color: 'text-green-700', bg: 'bg-green-50' },
  rejected: { text: 'Rejected', color: 'text-red-700', bg: 'bg-red-50' },
  draft: { text: 'Draft', color: 'text-gray-600', bg: 'bg-gray-100' },
  active: { text: 'Active', color: 'text-green-700', bg: 'bg-green-50' },
};

export default function BeneficiariesScreen() {
  const navigate = useNavigate();
  const { beneficiaries, setSelectedBeneficiaryId } = useApp();
  const [selected, setSelected] = useState<ManagedBeneficiary | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="gradient-primary px-5 pt-12 pb-14 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white mb-1">Beneficiaries</h1>
          <p className="text-blue-200 text-sm">{beneficiaries.length} beneficiaries managed</p>
        </div>
      </div>

      <div className="relative z-20 px-4 -mt-6 pb-6 space-y-3">
        {beneficiaries.map((b, i) => {
          const status = statusLabel[b.applicationStatus];
          return (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(b)}
              className="w-full bg-white rounded-2xl p-4 card-shadow text-left"
            >
              <div className="flex items-center gap-3">
                <img
                  src={b.photo}
                  alt={b.name}
                  className="w-14 h-14 rounded-full object-cover bg-blue-50"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${b.name}&background=005BAC&color=fff`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{b.name}</p>
                  <p className="text-xs text-gray-500 mb-1.5">{b.relationship}</p>
                  <div className={`${status.bg} inline-flex flex-col px-2.5 py-1 rounded-lg`}>
                    <span className={`text-xs font-semibold ${status.color}`}>{status.text}</span>
                    {status.sub && (
                      <span className={`text-[10px] ${status.color} opacity-80`}>{status.sub}</span>
                    )}
                  </div>
                </div>
                <span className="material-icons-round text-gray-300">chevron_right</span>
              </div>
            </motion.button>
          );
        })}

        <Button
          fullWidth
          size="xl"
          variant="outline"
          icon={<span className="material-icons-round text-xl">person_add</span>}
          onClick={() => navigate('/beneficiaries/add')}
        >
          Add Beneficiary
        </Button>
      </div>

      <BottomSheet
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Beneficiary Profile"
        height="auto"
      >
        {selected && (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={selected.photo}
                alt={selected.name}
                className="w-16 h-16 rounded-2xl bg-blue-50 object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selected.name}&background=005BAC&color=fff`;
                }}
              />
              <div>
                <h3 className="text-lg font-black text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.relationship}</p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: 'phone', label: 'Mobile', value: selected.mobile },
                { icon: 'credit_card', label: 'Aadhaar', value: selected.aadhaar },
                { icon: 'home', label: 'Address', value: selected.address },
                {
                  icon: 'info',
                  label: 'Status',
                  value: statusLabel[selected.applicationStatus].sub
                    ? `${statusLabel[selected.applicationStatus].text} · ${statusLabel[selected.applicationStatus].sub}`
                    : statusLabel[selected.applicationStatus].text,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="material-icons-round text-gray-400 text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {selected.applicationStatus === 'eligible_not_applied' && (
              <Button
                fullWidth
                size="lg"
                onClick={() => {
                  setSelectedBeneficiaryId(selected.id);
                  setSelected(null);
                  navigate('/application/fresh');
                }}
              >
                Start Application
              </Button>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
