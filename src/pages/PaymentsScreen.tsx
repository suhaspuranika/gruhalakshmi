import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import paymentsData from '../data/payments.json';
import type { Payment } from '../types';
import { formatCurrency } from '../lib/utils';

const statusLabel: Record<Payment['status'], { text: string; color: string }> = {
  released: { text: 'Success', color: 'text-green-600 bg-green-50' },
  pending: { text: 'Pending', color: 'text-yellow-600 bg-yellow-50' },
  processing: { text: 'Processing', color: 'text-blue-600 bg-blue-50' },
  failed: { text: 'Failed', color: 'text-red-600 bg-red-50' },
  pending_kyc: { text: 'Pending KYC', color: 'text-orange-600 bg-orange-50' },
};

export default function PaymentsScreen() {
  const payments = paymentsData as Payment[];
  const groups = useMemo(() => {
    const map = new Map<string, { name: string; items: Payment[] }>();
    payments.forEach(p => {
      const existing = map.get(p.beneficiaryId);
      if (existing) {
        existing.items.push(p);
      } else {
        map.set(p.beneficiaryId, { name: p.beneficiaryName, items: [p] });
      }
    });
    return Array.from(map.entries());
  }, [payments]);

  const [expanded, setExpanded] = useState<string | null>(groups[0]?.[0] ?? null);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="gradient-primary px-5 pt-12 pb-14 relative overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white mb-1">Payment Status</h1>
          <p className="text-blue-200 text-sm">Monthly benefits by beneficiary</p>
        </div>
      </div>

      <div className="relative z-20 px-4 -mt-6 pb-6 space-y-4">
        {groups.map(([beneficiaryId, group], gi) => (
          <motion.div
            key={beneficiaryId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.08 }}
            className="bg-white rounded-3xl card-shadow-lg overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left"
              onClick={() => setExpanded(expanded === beneficiaryId ? null : beneficiaryId)}
            >
              <div>
                <p className="font-bold text-gray-900">{group.name}</p>
                <p className="text-xs text-gray-400">{group.items.length} payment records</p>
              </div>
              <span className="material-icons-round text-gray-400">
                {expanded === beneficiaryId ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {expanded === beneficiaryId && (
              <div className="px-4 pb-4 space-y-3 border-t border-gray-50 pt-3">
                {group.items.map(payment => {
                  const status = statusLabel[payment.status];
                  return (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">{payment.month}</p>
                        <p className="text-lg font-black text-gray-900">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
