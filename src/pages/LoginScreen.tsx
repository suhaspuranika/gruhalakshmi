import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { sleep } from '../lib/utils';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useApp();

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleSendOtp = async () => {
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setSendingOtp(true);
    setError('');
    await sleep(1500);
    setSendingOtp(false);
    setOtpSent(true);
  };

  const handleLogin = async () => {
    if (otp !== '123456') {
      setOtpError('Invalid OTP. Use 123456 for demo');
      return;
    }
    setLoggingIn(true);
    setOtpError('');
    await sleep(1500);
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header gradient */}
      <div className="gradient-primary px-6 pt-14 pb-16 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-white/5"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-white">Gruhalakshmi</h1>
              <p className="text-white/70 text-xs">Government of Karnataka</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-white/70 text-sm mt-1">Login to access your benefits</p>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 mx-4 -mt-8 bg-white rounded-3xl p-6 card-shadow-lg z-10"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Login with Mobile</h3>

        <div className="space-y-4">
          {/* Mobile */}
          <Input
            label="Mobile Number"
            type="tel"
            maxLength={10}
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.replace(/\D/g, ''));
              setError('');
            }}
            placeholder="Enter 10-digit mobile number"
            error={error}
            leftIcon={<span className="material-icons-round text-lg">phone</span>}
            rightElement={
              <Button
                size="sm"
                variant={otpSent ? 'ghost' : 'primary'}
                loading={sendingOtp}
                onClick={handleSendOtp}
                disabled={mobile.length !== 10}
                className="text-xs"
              >
                {otpSent ? 'Resend' : 'Get OTP'}
              </Button>
            }
          />

          {/* OTP */}
          <AnimatePresence>
            {otpSent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Input
                  label="Enter OTP"
                  type="tel"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    setOtpError('');
                  }}
                  placeholder="6-digit OTP"
                  error={otpError}
                  hint="Demo OTP: 123456"
                  leftIcon={<span className="material-icons-round text-lg">lock</span>}
                />

                {/* OTP digits visual */}
                <div className="flex gap-2 mt-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        i < otp.length ? 'bg-[#005BAC]' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mock OTP hint */}
          {otpSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-2"
            >
              <span className="material-icons-round text-blue-500 text-sm">info</span>
              <p className="text-xs text-blue-700 font-medium">
                Demo Mode: OTP sent to +91 {mobile} • Use <strong>123456</strong>
              </p>
            </motion.div>
          )}

          <Button
            fullWidth
            size="xl"
            loading={loggingIn}
            disabled={!otpSent || otp.length !== 6}
            onClick={handleLogin}
            icon={<span className="material-icons-round text-xl">login</span>}
            iconPosition="right"
          >
            Login
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Register */}
        <Button
          fullWidth
          size="lg"
          variant="outline"
          icon={<span className="material-icons-round text-xl">person_add</span>}
          onClick={() => navigate('/register')}
        >
          Create New Account
        </Button>
      </motion.div>

      <div className="py-6 text-center">
        <p className="text-xs text-gray-400">
          By continuing, you agree to our{' '}
          <span className="text-[#005BAC] font-medium">Terms & Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
