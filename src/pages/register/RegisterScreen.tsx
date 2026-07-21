import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useApp } from '../../context/AppContext';
import { sleep } from '../../lib/utils';
import type { AccountRegistrationData } from '../../types';

const defaultData: AccountRegistrationData = {
  name: '',
  mobile: '',
  email: '',
  password: '',
  otp: '',
};

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { registerAccount } = useApp();
  const [step, setStep] = useState<'form' | 'otp'>('form');
  const [data, setData] = useState<AccountRegistrationData>(defaultData);
  const [errors, setErrors] = useState<Partial<Record<keyof AccountRegistrationData, string>>>({});
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState('');

  const update = (field: keyof AccountRegistrationData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validateForm = () => {
    const next: Partial<Record<keyof AccountRegistrationData, string>> = {};
    if (!data.name.trim()) next.name = 'Name is required';
    if (data.mobile.length !== 10) next.mobile = 'Enter a valid 10-digit mobile number';
    if (data.password.length < 6) next.password = 'Password must be at least 6 characters';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Enter a valid email';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) return;
    setLoading(true);
    await sleep(1200);
    setLoading(false);
    setStep('otp');
  };

  const handleCreateAccount = async () => {
    if (data.otp !== '123456') {
      setOtpError('Invalid OTP. Use 123456 for demo');
      return;
    }
    setLoading(true);
    setOtpError('');
    await sleep(1200);
    registerAccount({ name: data.name, mobile: data.mobile, email: data.email });
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="bg-white border-b border-gray-100">
        <PageHeader
          title="Register"
          subtitle="Create your account"
          showBack={true}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <AnimatePresence mode="wait">
          {step === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="mb-2">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-3">
                  <span className="material-icons-round text-[#005BAC] text-2xl">person_add</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Register as an account holder. You can add beneficiaries after login.
                </p>
              </div>

              <Input
                label="Name"
                value={data.name}
                onChange={e => update('name', e.target.value)}
                placeholder="Your full name"
                error={errors.name}
                leftIcon={<span className="material-icons-round text-lg">badge</span>}
              />

              <Input
                label="Mobile Number"
                type="tel"
                maxLength={10}
                value={data.mobile}
                onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit mobile number"
                error={errors.mobile}
                leftIcon={<span className="material-icons-round text-lg">phone</span>}
              />

              <Input
                label="Email (Optional)"
                type="email"
                value={data.email}
                onChange={e => update('email', e.target.value)}
                placeholder="email@example.com"
                error={errors.email}
                leftIcon={<span className="material-icons-round text-lg">email</span>}
              />

              <Input
                label="Password"
                type="password"
                value={data.password}
                onChange={e => update('password', e.target.value)}
                placeholder="Min. 6 characters"
                error={errors.password}
                leftIcon={<span className="material-icons-round text-lg">lock</span>}
              />

              <Button
                fullWidth
                size="xl"
                loading={loading}
                onClick={handleSendOtp}
                icon={<span className="material-icons-round text-xl">sms</span>}
                iconPosition="right"
              >
                Continue to OTP
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="mb-2">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-3">
                  <span className="material-icons-round text-green-600 text-2xl">verified_user</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">OTP Verification</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter the OTP sent to +91 {data.mobile}
                </p>
              </div>

              <Input
                label="Enter OTP"
                type="tel"
                maxLength={6}
                value={data.otp}
                onChange={e => {
                  update('otp', e.target.value.replace(/\D/g, ''));
                  setOtpError('');
                }}
                placeholder="6-digit OTP"
                error={otpError}
                hint="Demo OTP: 123456"
                leftIcon={<span className="material-icons-round text-lg">pin</span>}
              />

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2">
                <span className="material-icons-round text-blue-500 text-sm">info</span>
                <p className="text-xs text-blue-700 font-medium">
                  Demo Mode: Use <strong>123456</strong>
                </p>
              </div>

              <Button
                fullWidth
                size="xl"
                loading={loading}
                disabled={data.otp.length !== 6}
                onClick={handleCreateAccount}
                icon={<span className="material-icons-round text-xl">check</span>}
                iconPosition="right"
              >
                Create Account
              </Button>

              <Button fullWidth size="lg" variant="ghost" onClick={() => setStep('form')}>
                Back to details
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
