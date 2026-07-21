import { useState } from 'react';
import { motion } from 'framer-motion';
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

export default function Step1Mobile({ data, updateData, onNext }: StepProps) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');

  const sendOtp = async () => {
    if (data.mobile.length !== 10) { setError('Enter valid 10-digit number'); return; }
    setSending(true); setError('');
    await sleep(1500);
    setSending(false); setSent(true);
  };

  const verify = async () => {
    if (data.otp !== '123456') { setOtpError('Invalid OTP. Use 123456'); return; }
    setVerifying(true); setOtpError('');
    await sleep(1000);
    onNext();
  };

  return (
    <div className="p-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-[#005BAC] text-3xl">phone_android</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Mobile Verification</h2>
        <p className="text-sm text-gray-500 mt-1">Verify your mobile number to get started</p>
      </motion.div>

      <Input
        label="Mobile Number"
        type="tel" maxLength={10}
        value={data.mobile}
        onChange={e => { updateData({ mobile: e.target.value.replace(/\D/g, '') }); setError(''); }}
        placeholder="10-digit mobile number"
        error={error}
        leftIcon={<span className="material-icons-round text-lg">phone</span>}
        rightElement={
          <Button size="sm" loading={sending} onClick={sendOtp} disabled={data.mobile.length !== 10}>
            {sent ? 'Resend' : 'Send OTP'}
          </Button>
        }
      />

      {sent && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Input
            label="Enter OTP"
            type="tel" maxLength={6}
            value={data.otp}
            onChange={e => { updateData({ otp: e.target.value.replace(/\D/g, '') }); setOtpError(''); }}
            placeholder="6-digit OTP"
            error={otpError}
            hint="Demo OTP: 123456"
            leftIcon={<span className="material-icons-round text-lg">lock</span>}
          />

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2 mt-2">
            <span className="material-icons-round text-blue-500 text-sm">info</span>
            <p className="text-xs text-blue-700 font-medium">OTP sent to +91 {data.mobile} • Demo: <strong>123456</strong></p>
          </div>
        </motion.div>
      )}

      <Button fullWidth size="xl" loading={verifying} disabled={!sent || data.otp.length !== 6} onClick={verify}
        icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
        Verify & Continue
      </Button>
    </div>
  );
}
