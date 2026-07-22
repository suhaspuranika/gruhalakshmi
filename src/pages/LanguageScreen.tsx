import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import { cn } from '../lib/utils';
import govtlogo from '../assets/govtlogo.png';

const languages = [
  {
    code: 'en' as const,
    name: 'English',
    native: 'English',
    flag: '🇬🇧',
    description: 'Continue in English',
  },
  {
    code: 'kn' as const,
    name: 'Kannada',
    native: 'ಕನ್ನಡ',
    flag: '🇮🇳',
    description: 'ಕನ್ನಡದಲ್ಲಿ ಮುಂದುವರಿಯಿರಿ',
  },
];

export default function LanguageScreen() {
  const navigate = useNavigate();
  const { language, setLanguage } = useApp();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="gradient-primary px-6 pt-12 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img src={govtlogo} alt="Govt of Karnataka" className="w-full h-full object-contain p-1" />
          </div>
          <h1 className="text-2xl font-black text-white">Gruhalakshmi</h1>
          <p className="text-white/70 text-sm mt-1">Government of Karnataka</p>
        </motion.div>
      </div>

      {/* Language selection */}
      <div className="flex-1 px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">Select Language</h2>
          <p className="text-sm text-gray-500 mb-6">Choose your preferred language to continue</p>

          <div className="space-y-3 mb-8">
            {languages.map((lang, i) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  'w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left',
                  language === lang.code
                    ? 'border-[#005BAC] bg-blue-50 shadow-sm shadow-blue-100'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <span className="text-3xl">{lang.flag}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{lang.native}</p>
                  <p className="text-sm text-gray-500">{lang.description}</p>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-[#005BAC] flex items-center justify-center"
                  >
                    <span className="material-icons-round text-white text-sm">check</span>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <Button
            fullWidth
            size="xl"
            onClick={handleContinue}
            icon={<span className="material-icons-round text-xl">arrow_forward</span>}
            iconPosition="right"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
