import { motion } from 'framer-motion';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Processing...' }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
      style={{ maxWidth: '430px', margin: '0 auto' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-[#005BAC] border-t-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full bg-[#005BAC]/5 flex items-center justify-center">
            <span className="material-icons-round text-[#005BAC] text-lg">auto_awesome</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-700 font-semibold text-sm">{message}</p>
          <p className="text-gray-400 text-xs mt-1">Please wait...</p>
        </div>
      </div>
    </motion.div>
  );
}
