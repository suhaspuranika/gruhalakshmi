import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import CameraPreview from '../../../components/CameraPreview';
import type { RegistrationData } from '../../../types';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const faceSteps = ['Look Straight', 'Blink', 'Turn Left', 'Turn Right', 'Smile'];

export default function Step3Face({ updateData, onNext }: StepProps) {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCameraComplete = (success: boolean) => {
    if (success) {
      updateData({ faceRegistered: true });
      setCompleted(true);
    }
  };

  if (started && !completed) {
    return (
      <div className="relative h-[calc(100vh-180px)]">
        <CameraPreview steps={faceSteps} onComplete={handleCameraComplete} />
      </div>
    );
  }

  if (completed) {
    return (
      <div className="p-5 flex flex-col items-center justify-center min-h-64">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8 relative"
        >
          <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-lg">
              <span className="material-icons-round text-white text-4xl">face</span>
            </div>
          </div>
          {[1, 2].map(i => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-green-300"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1 + i * 0.3, opacity: 0 }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
            />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Face Registered!</h2>
          <p className="text-gray-500 text-sm">Your face has been successfully registered for biometric verification</p>

          <div className="mt-4 flex justify-center gap-3">
            {['Liveness Check ✓', 'Face Mapped ✓', 'AI Enrolled ✓'].map(tag => (
              <span key={tag} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <Button fullWidth size="xl" onClick={onNext}
          icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
          Continue
        </Button>
      </div>
    );
  }

  return (
    <div className="p-5 space-y-5">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-purple-500 text-3xl">face</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Face Registration</h2>
        <p className="text-sm text-gray-500 mt-1">Register your face for monthly biometric verification</p>
      </motion.div>

      {/* Camera preview placeholder */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900" style={{ height: 280 }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
          {/* Oval frame */}
          <div className="relative" style={{ width: 180, height: 220 }}>
            <div className="absolute inset-0 border-2 border-white/40 rounded-full"
                 style={{ borderRadius: '50% / 43%' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-icons-round text-white/20" style={{ fontSize: 80 }}>person</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
          <span className="text-white/60 text-sm font-medium">Position your face here</span>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="text-xs font-bold text-[#005BAC] uppercase tracking-wider mb-3">Verification Steps</p>
        <div className="grid grid-cols-5 gap-2">
          {faceSteps.map((step, i) => {
            const icons = ['face', 'visibility', 'arrow_back', 'arrow_forward', 'sentiment_satisfied'];
            return (
              <div key={step} className="flex flex-col items-center gap-1">
                <div className="w-9 h-9 rounded-full bg-[#005BAC]/10 flex items-center justify-center">
                  <span className="material-icons-round text-[#005BAC] text-lg">{icons[i]}</span>
                </div>
                <p className="text-center text-[10px] text-gray-600 leading-tight">{step}</p>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Button fullWidth size="xl" variant="primary" onClick={() => setStarted(true)}
            icon={<span className="material-icons-round text-xl">videocam</span>}>
            Start Face Registration
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
