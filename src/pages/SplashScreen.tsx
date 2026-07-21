import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import logo from '../assets/logo.png';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isLoggedIn, language } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigate('/dashboard', { replace: true });
      } else if (language) {
        navigate('/language', { replace: true });
      } else {
        navigate('/language', { replace: true });
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []); // empty deps — run once only

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#005BAC] via-[#0070D2] to-[#004d94] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5"
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 right-10 w-32 h-32 rounded-full bg-white/5"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Govt label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="text-2xl">🏛️</span>
          <p className="text-white/80 text-xs font-semibold tracking-widest uppercase">
            Government of Karnataka
          </p>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-36 h-36 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-black/40 p-2">
            <img
              src={logo}
              alt="Gruhalakshmi Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-center"
        >
          <h1 className="text-4xl font-black text-white tracking-tight">Gruhalakshmi</h1>
          <p className="text-white/70 text-base font-medium mt-1">ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ</p>
          <p className="text-white/50 text-xs mt-1">Women Empowerment Scheme</p>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-white/60 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 text-white/30 text-xs text-center"
      >
        Powered by e-Governance Karnataka • v2.0.1
      </motion.p>
    </div>
  );
}
