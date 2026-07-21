import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

interface VerificationAnimationProps {
  success: boolean;
  matchScore?: number;
  subtitle?: string;
}

export default function VerificationAnimation({
  success,
  matchScore = 98.7,
  subtitle,
}: VerificationAnimationProps) {
  const navigate = useNavigate();

  if (success) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-white">
        {/* Confetti particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="fixed w-2 h-2 rounded-sm pointer-events-none z-50"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#005BAC', '#22C55E', '#F58220', '#F59E0B', '#8B5CF6'][i % 5],
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 1,
              ease: 'easeIn',
            }}
          />
        ))}

        {/* Success circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 rounded-full bg-green-50 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-20 h-20 rounded-full gradient-success flex items-center justify-center shadow-lg shadow-green-300"
            >
              <span className="material-icons-round text-white text-4xl">check</span>
            </motion.div>
          </div>
          {/* Pulse rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-green-300"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 1 + i * 0.4, opacity: 0 }}
              transition={{
                duration: 1.5,
                delay: i * 0.3 + 0.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {subtitle ? 'Verification Successful' : 'Identity Verified'}
          </h2>
          <p className="text-gray-500 mb-6">
            {subtitle || 'Your face has been successfully matched'}
          </p>

          {/* Match score */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-5 mb-4">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="material-icons-round text-green-500 text-2xl">verified_user</span>
              <span className="text-3xl font-black text-green-600">{matchScore}%</span>
            </div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Match Score</p>
            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-success rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${matchScore}%` }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
          </div>

          {/* Status chips */}
          <div className="flex gap-3 justify-center flex-wrap">
            {['Identity Verified', 'Payment Eligible', 'KYC Active'].map((tag) => (
              <span key={tag} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="material-icons-round text-xs">check_circle</span>
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <Button
            fullWidth
            size="xl"
            variant="success"
            icon={<span className="material-icons-round text-xl">arrow_forward</span>}
            iconPosition="right"
            onClick={() => navigate('/dashboard')}
          >
            Continue to Dashboard
          </Button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Payment will be processed within 24 hours
          </p>
        </motion.div>
      </div>
    );
  }

  // Failure state
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 bg-white">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-[#EF4444] flex items-center justify-center shadow-lg shadow-red-300"
          >
            <span className="material-icons-round text-white text-4xl">close</span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Face Not Matched</h2>
        <p className="text-gray-500 mb-4">We couldn't verify your identity. Please try again in better lighting.</p>

        <div className="bg-red-50 rounded-2xl p-4 text-left">
          <p className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
            <span className="material-icons-round text-sm">tips_and_updates</span>
            Tips for better verification
          </p>
          {[
            'Ensure good lighting on your face',
            'Remove glasses if wearing any',
            'Keep face within the oval frame',
            'Look directly at the camera',
          ].map((tip) => (
            <p key={tip} className="text-xs text-red-600 flex items-center gap-2 mb-1">
              <span className="w-1 h-1 bg-red-400 rounded-full" />
              {tip}
            </p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full space-y-3"
      >
        <Button
          fullWidth
          size="xl"
          icon={<span className="material-icons-round text-xl">refresh</span>}
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
        <Button
          fullWidth
          size="lg"
          variant="outline"
          icon={<span className="material-icons-round text-xl">location_on</span>}
          onClick={() => navigate('/dashboard')}
        >
          Visit Service Center
        </Button>
      </motion.div>
    </div>
  );
}
