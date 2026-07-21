import { motion } from 'framer-motion';
import type { Payment } from '../../types';
import { formatCurrency } from '../../lib/utils';
import StatusBadge from './StatusBadge';

interface PaymentCardProps {
  payment: Payment;
  index: number;
}

const statusMap: Record<string, 'released' | 'pending' | 'processing' | 'failed'> = {
  released: 'released',
  pending: 'pending',
  processing: 'processing',
  failed: 'failed',
  pending_kyc: 'pending',
};

export default function PaymentCard({ payment, index }: PaymentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl card-shadow"
    >
      {/* Month icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        payment.status === 'released' ? 'bg-green-50' :
        payment.status === 'pending' ? 'bg-yellow-50' : 'bg-red-50'
      }`}>
        <span className={`material-icons-round text-xl ${
          payment.status === 'released' ? 'text-green-500' :
          payment.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
        }`}>
          {payment.status === 'released' ? 'account_balance_wallet' : 
           payment.status === 'pending' ? 'hourglass_empty' : 'error_outline'}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-gray-900 text-sm">{payment.month} {payment.year}</span>
          <span className={`font-bold text-base ${
            payment.status === 'released' ? 'text-green-600' :
            payment.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {formatCurrency(payment.amount)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{payment.date}</span>
          <StatusBadge status={statusMap[payment.status]} size="sm" />
        </div>
        {payment.utrNumber && (
          <p className="text-xs text-gray-400 mt-0.5">UTR: {payment.utrNumber}</p>
        )}
      </div>
    </motion.div>
  );
}
