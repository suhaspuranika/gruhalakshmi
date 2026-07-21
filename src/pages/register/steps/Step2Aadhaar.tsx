import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import type { RegistrationData } from '../../../types';
import { sleep } from '../../../lib/utils';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const mockAadhaarData = {
  name: 'Lakshmi Devi',
  dob: '15-08-1985',
  gender: 'Female',
  address: 'No. 42, Rajiv Nagar, Jayanagar, Bangalore Urban, Karnataka - 560041',
  village: 'Jayanagar',
  ward: 'Ward No. 12',
  district: 'Bangalore Urban',
  taluk: 'Bangalore South',
  pincode: '560041',
};

export default function Step2Aadhaar({ data, updateData, onNext }: StepProps) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyAadhaar = async () => {
    const clean = data.aadhaar.replace(/\s/g, '');
    if (clean.length !== 12) { setError('Enter valid 12-digit Aadhaar number'); return; }
    setVerifying(true); setError('');
    await sleep(2000);
    setVerifying(false); setVerified(true);
    updateData({ ...mockAadhaarData });
  };

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 12);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="p-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-orange-500 text-3xl">fingerprint</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Aadhaar eKYC</h2>
        <p className="text-sm text-gray-500 mt-1">Enter your Aadhaar to auto-fill your details</p>
      </motion.div>

      <Input
        label="Aadhaar Number"
        type="tel"
        value={data.aadhaar}
        onChange={e => { updateData({ aadhaar: formatAadhaar(e.target.value) }); setError(''); }}
        placeholder="XXXX XXXX XXXX"
        error={error}
        maxLength={14}
        leftIcon={<span className="material-icons-round text-lg">credit_card</span>}
        hint="Your 12-digit Aadhaar number"
      />

      {!verified && (
        <Button fullWidth size="xl" loading={verifying}
          disabled={data.aadhaar.replace(/\s/g, '').length !== 12} onClick={verifyAadhaar}
          icon={<span className="material-icons-round text-xl">verified</span>}>
          Verify Aadhaar (eKYC)
        </Button>
      )}

      <AnimatePresence>
        {verified && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Verified badge */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="material-icons-round text-green-600 text-xl">verified</span>
                </div>
                <div>
                  <p className="font-bold text-green-800 text-sm">Aadhaar Verified</p>
                  <p className="text-xs text-green-600">Details auto-filled successfully</p>
                </div>
                <div className="ml-auto">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    ✓ KYC Done
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 border-t border-green-200 pt-3">
                {[
                  { label: 'Name', value: data.name, icon: 'person' },
                  { label: 'Date of Birth', value: data.dob, icon: 'cake' },
                  { label: 'Gender', value: data.gender, icon: 'wc' },
                  { label: 'Aadhaar', value: `XXXX XXXX ${data.aadhaar.replace(/\s/g, '').slice(-4)}`, icon: 'credit_card' },
                  { label: 'Address', value: data.address, icon: 'home' },
                ].map(item => (
                  <div key={item.label} className="flex gap-2">
                    <span className="material-icons-round text-green-500 text-sm mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-xs text-green-600">{item.label}</p>
                      <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button fullWidth size="xl" onClick={onNext}
              icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
              Continue
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
