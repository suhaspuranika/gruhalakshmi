import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  showBack = true,
  rightElement,
  transparent = false,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-4 ${transparent ? '' : 'bg-white border-b border-gray-100'}`}
    >
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
        >
          <span className="material-icons-round text-gray-700 text-xl">arrow_back</span>
        </button>
      )}
      <div className="flex-1">
        <h1 className="font-bold text-gray-900 text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {rightElement}
    </motion.div>
  );
}
