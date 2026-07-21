import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import PaymentCard from '../components/ui/PaymentCard';
import paymentsData from '../data/payments.json';
import type { Payment } from '../types';
import { formatCurrency } from '../lib/utils';

export default function PaymentsScreen() {
  const payments = paymentsData as Payment[];
  const totalReleased = payments.filter(p => p.status === 'released').reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-16 relative overflow-hidden">
        <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div>
              <h1 className="text-2xl font-black text-white">Payments</h1>
              <p className="text-blue-200 text-sm">Gruhalakshmi Monthly Benefits</p>
            </div>
          </div>
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-blue-200 text-xs mb-1">Total Received</p>
              <p className="text-white font-black text-xl">{formatCurrency(totalReleased)}</p>
              <p className="text-blue-200 text-xs mt-0.5">{payments.filter(p => p.status === 'released').length} payments</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-3">
              <p className="text-blue-200 text-xs mb-1">Monthly Amount</p>
              <p className="text-white font-black text-xl">₹2,000</p>
              <p className={`text-xs mt-0.5 ${pending > 0 ? 'text-yellow-300' : 'text-green-300'}`}>
                {pending > 0 ? `${pending} pending` : 'All up to date'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8">
        {/* Timeline list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 card-shadow-lg mb-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Payment History</h3>
            <span className="text-xs text-[#005BAC] font-semibold bg-blue-50 px-2 py-1 rounded-full">
              2026
            </span>
          </div>

          {/* Timeline connector */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-100 z-0" />
            <div className="space-y-3">
              {payments.map((payment, i) => (
                <div key={payment.id} className="relative pl-0">
                  <PaymentCard payment={payment} index={i} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Annual summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 card-shadow mb-4"
        >
          <h3 className="font-bold text-gray-800 text-sm mb-3">Annual Summary 2026</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Released', value: payments.filter(p => p.status === 'released').length, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Pending', value: payments.filter(p => p.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Total Months', value: payments.length, color: 'text-blue-600', bg: 'bg-blue-50' },
            ].map(item => (
              <div key={item.label} className={`${item.bg} rounded-xl p-3`}>
                <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
