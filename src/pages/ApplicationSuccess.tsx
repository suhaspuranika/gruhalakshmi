import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function ApplicationSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const appId =
    (location.state as { applicationNo?: string } | null)?.applicationNo ||
    'GLK20260000125';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-8 relative overflow-hidden">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2.5 h-2.5 rounded-sm pointer-events-none z-50"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#005BAC', '#22C55E', '#F58220', '#F59E0B', '#8B5CF6', '#EF4444'][i % 6],
            top: '-20px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 2,
            ease: 'easeIn',
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center shadow-2xl shadow-green-300">
            <span className="material-icons-round text-white" style={{ fontSize: 48 }}>
              check
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-8 w-full"
      >
        <h1 className="text-3xl font-black text-gray-900 mb-2">Application Submitted</h1>
        <p className="text-gray-500 mb-6">
          The beneficiary application has been submitted for review
        </p>

        <div className="bg-gradient-to-r from-[#005BAC] to-[#0070D2] rounded-2xl p-5 text-white mb-6">
          <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-2">
            Application No.
          </p>
          <p className="text-2xl font-black tracking-wider mb-1">{appId}</p>
          <p className="text-blue-200 text-xs">Keep this number for future reference</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full space-y-3"
      >
        <Button
          fullWidth
          size="xl"
          variant="success"
          onClick={() => navigate('/dashboard')}
          icon={<span className="material-icons-round text-xl">home</span>}
          iconPosition="right"
        >
          Go to Home
        </Button>
        <Button
          fullWidth
          size="lg"
          variant="outline"
          onClick={() => navigate('/applications')}
        >
          View My Applications
        </Button>
      </motion.div>
    </div>
  );
}
