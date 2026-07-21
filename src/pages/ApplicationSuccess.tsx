import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';

export default function ApplicationSuccess() {
  const navigate = useNavigate();
  const { login } = useApp();
  const appId = 'GL2026458732';

  const handleDashboard = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-8 relative overflow-hidden">
      {/* Confetti */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-2.5 h-2.5 rounded-sm pointer-events-none z-50"
          style={{
            left: `${Math.random() * 100}%`,
            backgroundColor: ['#005BAC', '#22C55E', '#F58220', '#F59E0B', '#8B5CF6', '#EF4444'][i % 6],
            top: '-20px',
          }}
          animate={{ y: ['0vh', '110vh'], rotate: [0, 720 * (Math.random() > 0.5 ? 1 : -1)], opacity: [1, 0] }}
          transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 2, ease: 'easeIn' }}
        />
      ))}

      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-green-50 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center shadow-2xl shadow-green-300">
            <span className="material-icons-round text-white" style={{ fontSize: 48 }}>check</span>
          </div>
        </div>
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-green-300"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 1 + i * 0.3, opacity: 0 }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mb-8 w-full"
      >
        <h1 className="text-3xl font-black text-gray-900 mb-2">Application Submitted!</h1>
        <p className="text-gray-500 mb-6">Your application has been successfully submitted for review</p>

        {/* Application ID card */}
        <div className="bg-gradient-to-r from-[#005BAC] to-[#0070D2] rounded-2xl p-5 text-white mb-6">
          <p className="text-xs font-semibold text-blue-200 uppercase tracking-widest mb-2">Application ID</p>
          <p className="text-2xl font-black tracking-wider mb-1">{appId}</p>
          <p className="text-blue-200 text-xs">Keep this ID for future reference</p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-4 card-shadow text-left space-y-3">
          {[
            { label: 'Application Submitted', done: true, date: 'Today' },
            { label: 'Document Verification', done: false, date: '2-3 Days' },
            { label: 'Field Verification', done: false, date: '5-7 Days' },
            { label: 'Approval & Activation', done: false, date: '7-10 Days' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                item.done ? 'gradient-success' : 'bg-gray-100'
              }`}>
                {item.done
                  ? <span className="material-icons-round text-white text-sm">check</span>
                  : <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                }
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${item.done ? 'text-gray-900' : 'text-gray-500'}`}>
                  {item.label}
                </p>
              </div>
              <span className="text-xs text-gray-400">{item.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full space-y-3"
      >
        <Button fullWidth size="xl" variant="outline"
          icon={<span className="material-icons-round text-xl">download</span>}>
          Download PDF
        </Button>
        <Button fullWidth size="xl" variant="success" onClick={handleDashboard}
          icon={<span className="material-icons-round text-xl">dashboard</span>} iconPosition="right">
          Go to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}
