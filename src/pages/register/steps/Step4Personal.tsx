import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import type { RegistrationData } from '../../../types';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Personal({ data, updateData, onNext }: StepProps) {
  const [epicError, setEpicError] = useState('');

  const fields = [
    { key: 'address', label: 'Full Address', icon: 'home', placeholder: 'House/Plot No, Street, Area' },
    { key: 'village', label: 'Village / Town', icon: 'location_city', placeholder: 'Village or Town name' },
    { key: 'ward', label: 'Ward', icon: 'map', placeholder: 'Ward number or name' },
    { key: 'district', label: 'District', icon: 'domain', placeholder: 'District name' },
    { key: 'taluk', label: 'Taluk', icon: 'place', placeholder: 'Taluk name' },
    { key: 'pincode', label: 'Pincode', icon: 'pin', placeholder: '6-digit pincode', type: 'tel', maxLen: 6 },
    { key: 'mobile', label: 'Mobile Number', icon: 'phone', placeholder: '10-digit mobile', type: 'tel', maxLen: 10 },
  ];

  const handleContinue = () => {
    const epic = data.voterEpic.trim().toUpperCase();
    if (!epic) {
      setEpicError('Voter EPIC number is required');
      return;
    }
    if (!/^[A-Z]{3}[0-9]{7}$/.test(epic)) {
      setEpicError('Enter a valid EPIC (e.g. ABC1234567)');
      return;
    }
    setEpicError('');
    updateData({ voterEpic: epic });
    onNext();
  };

  return (
    <div className="p-5 space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-green-600 text-3xl">person</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Eligibility Details</h2>
        <p className="text-sm text-gray-500 mt-1">Review personal details and enter EPIC number</p>
      </motion.div>

      {data.name && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-3 flex items-center gap-2">
          <span className="material-icons-round text-green-500 text-sm">auto_fix_high</span>
          <p className="text-xs text-green-700 font-medium">Details pre-filled from Aadhaar eKYC</p>
        </div>
      )}

      <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
        <p className="text-xs font-bold text-[#005BAC] uppercase tracking-wider mb-2">From Aadhaar</p>
        {[
          { label: 'Full Name', value: data.name, icon: 'badge' },
          { label: 'Date of Birth', value: data.dob, icon: 'cake' },
          { label: 'Gender', value: data.gender, icon: 'wc' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="material-icons-round text-blue-400 text-sm">{item.icon}</span>
            <div>
              <p className="text-xs text-blue-500">{item.label}</p>
              <p className="text-sm font-bold text-gray-800">{item.value || '—'}</p>
            </div>
          </div>
        ))}
      </div>

      <Input
        label="Voter EPIC Number"
        value={data.voterEpic}
        onChange={e => {
          const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
          updateData({ voterEpic: val });
          setEpicError('');
        }}
        placeholder="e.g. ABC1234567"
        error={epicError}
        hint="10-character EPIC ID from Voter ID card"
        maxLength={10}
        leftIcon={<span className="material-icons-round text-lg">how_to_vote</span>}
      />

      <div className="space-y-3">
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Input
              label={field.label}
              type={(field.type as 'text' | 'tel') || 'text'}
              value={(data as unknown as Record<string, string>)[field.key] || ''}
              onChange={e => {
                let val = e.target.value;
                if (field.type === 'tel') val = val.replace(/\D/g, '');
                if (field.maxLen) val = val.slice(0, field.maxLen);
                updateData({ [field.key]: val });
              }}
              placeholder={field.placeholder}
              maxLength={field.maxLen}
              leftIcon={<span className="material-icons-round text-lg">{field.icon}</span>}
            />
          </motion.div>
        ))}
      </div>

      <Button fullWidth size="xl" onClick={handleContinue}
        icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
        Save & Continue
      </Button>
    </div>
  );
}
