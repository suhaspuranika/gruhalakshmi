import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CameraPreview from '../components/CameraPreview';
import VerificationAnimation from '../components/VerificationAnimation';
import Button from '../components/ui/Button';

type VerificationState = 'intro' | 'camera' | 'result';

export default function VerificationScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromKyc = !!(location.state as { fromKyc?: boolean } | null)?.fromKyc;
  const beneficiaryName = (location.state as { beneficiaryName?: string } | null)?.beneficiaryName;
  const [state, setState] = useState<VerificationState>('intro');
  const [success, setSuccess] = useState(false);
  const [matchScore] = useState(() => 95 + Math.random() * 4);

  const handleCameraComplete = (result: boolean) => {
    setSuccess(result);
    setState('result');
  };

  if (state === 'camera') {
    return (
      <div className="fixed inset-0 z-50 bg-black" style={{ maxWidth: '430px', margin: '0 auto' }}>
        {/* Back button */}
        <button
          onClick={() => setState('intro')}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 rounded-xl flex items-center justify-center"
        >
          <span className="material-icons-round text-white text-xl">close</span>
        </button>
        <CameraPreview onComplete={handleCameraComplete} />
      </div>
    );
  }

  if (state === 'result') {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-white border-b border-gray-100 px-4 py-4">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-600">
            <span className="material-icons-round">arrow_back</span>
            <span className="font-semibold">Verification Result</span>
          </button>
        </div>
        <VerificationAnimation
          success={success}
          matchScore={parseFloat(matchScore.toFixed(1))}
          subtitle={fromKyc ? 'Next payment will be processed.' : undefined}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <div className="gradient-primary px-5 pt-14 pb-16 relative overflow-hidden">
        <motion.div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <button onClick={() => navigate(-1)} className="absolute top-14 left-4 w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <span className="material-icons-round text-white text-xl">arrow_back</span>
        </button>
        <div className="text-center relative z-10 mt-6">
          <h1 className="text-2xl font-black text-white">Face Verification</h1>
          <p className="text-blue-200 text-sm mt-1">
            {beneficiaryName
              ? `Verifying ${beneficiaryName}`
              : 'Monthly biometric verification'}
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 -mt-8">
        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 card-shadow-lg mb-4"
        >
          {/* Camera preview frame */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-900 mb-5" style={{ height: 240 }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
              {/* Animated oval */}
              <div className="relative" style={{ width: 160, height: 200 }}>
                <motion.div
                  className="absolute inset-0 border-2 border-blue-400"
                  style={{ borderRadius: '50% / 43%' }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Pulse rings */}
                {[1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border border-blue-400"
                    style={{ borderRadius: '50% / 43%' }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1 + i * 0.15, opacity: 0 }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-icons-round text-white/20" style={{ fontSize: 70 }}>person</span>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-black/40 rounded-full px-3 py-1.5 flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-semibold">AI CAMERA</span>
            </div>
            <div className="absolute bottom-4 inset-x-0 flex justify-center">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                <p className="text-white text-xs font-medium">Position face in frame</p>
              </div>
            </div>
          </div>

          {/* Verification steps */}
          <div className="mb-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Verification Process</p>
            <div className="flex justify-between">
              {[
                { icon: 'face', label: 'Look Straight' },
                { icon: 'visibility', label: 'Blink' },
                { icon: 'arrow_back', label: 'Turn Left' },
                { icon: 'arrow_forward', label: 'Turn Right' },
                { icon: 'sentiment_satisfied', label: 'Smile' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="material-icons-round text-[#005BAC] text-lg">{step.icon}</span>
                  </div>
                  <p className="text-center text-[9px] text-gray-500 leading-tight max-w-10">{step.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Button fullWidth size="xl"
            icon={<span className="material-icons-round text-xl">videocam</span>}
            onClick={() => setState('camera')}
          >
            Start Verification
          </Button>
        </motion.div>

        {/* Info cards */}
        <div className="space-y-3 pb-4">
          {[
            { icon: 'wb_sunny', color: 'text-yellow-500', bg: 'bg-yellow-50', text: 'Ensure good lighting and remove glasses' },
            { icon: 'network_wifi', color: 'text-blue-500', bg: 'bg-blue-50', text: 'Stable internet connection required' },
            { icon: 'privacy_tip', color: 'text-green-500', bg: 'bg-green-50', text: 'Your biometric data is encrypted and secure' },
          ].map((info, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white rounded-xl card-shadow"
            >
              <div className={`w-9 h-9 rounded-xl ${info.bg} flex items-center justify-center`}>
                <span className={`material-icons-round ${info.color} text-lg`}>{info.icon}</span>
              </div>
              <p className="text-xs text-gray-600 flex-1">{info.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
