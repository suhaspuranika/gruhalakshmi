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

const mockBankData = {
  bankName: 'State Bank of India',
  branch: 'Jayanagar Branch',
};

export default function Step5Bank({ data, updateData, onNext }: StepProps) {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  const verifyBank = async () => {
    if (!data.bankAccount || !data.ifsc) { setError('Enter account number and IFSC'); return; }
    setVerifying(true); setError('');
    await sleep(2000);
    setVerifying(false); setVerified(true);
    updateData(mockBankData);
  };

  return (
    <div className="p-5 space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-indigo-600 text-3xl">account_balance</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Bank Details</h2>
        <p className="text-sm text-gray-500 mt-1">Add your bank account to receive payments</p>
      </motion.div>

      <Input
        label="Account Number"
        type="tel"
        value={data.bankAccount}
        onChange={e => updateData({ bankAccount: e.target.value.replace(/\D/g, '') })}
        placeholder="Bank account number"
        leftIcon={<span className="material-icons-round text-lg">credit_card</span>}
      />

      <Input
        label="IFSC Code"
        type="text"
        value={data.ifsc}
        onChange={e => updateData({ ifsc: e.target.value.toUpperCase() })}
        placeholder="e.g. SBIN0001234"
        leftIcon={<span className="material-icons-round text-lg">code</span>}
        hint="11-character IFSC code"
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2">
          <span className="material-icons-round text-red-500 text-sm">error</span>
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      {!verified && (
        <Button fullWidth size="xl" loading={verifying}
          disabled={!data.bankAccount || !data.ifsc} onClick={verifyBank}
          icon={<span className="material-icons-round text-xl">verified</span>}>
          Verify Bank Account
        </Button>
      )}

      <AnimatePresence>
        {verified && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Success card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <span className="material-icons-round text-green-600">account_balance</span>
                </div>
                <div>
                  <p className="font-bold text-green-800 text-sm">Bank Verified</p>
                  <p className="text-xs text-green-600">Account linked successfully</p>
                </div>
                <span className="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">✓ Active</span>
              </div>
              <div className="space-y-1.5 border-t border-green-200 pt-3">
                {[
                  { label: 'Bank', value: data.bankName, icon: 'account_balance' },
                  { label: 'Branch', value: data.branch, icon: 'location_on' },
                  { label: 'Account', value: `XXXX XXXX ${data.bankAccount.slice(-4)}`, icon: 'credit_card' },
                  { label: 'IFSC', value: data.ifsc, icon: 'code' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className="material-icons-round text-green-500 text-sm">{item.icon}</span>
                    <span className="text-xs text-green-600">{item.label}:</span>
                    <span className="text-sm font-semibold text-gray-800">{item.value}</span>
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
