import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { sleep } from '../lib/utils';
import type { ManagedBeneficiary } from '../types';

type Phase = 'search' | 'found' | 'success';

export default function ExistingKycScreen() {
  const navigate = useNavigate();
  const { beneficiaries } = useApp();
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState<ManagedBeneficiary | null>(null);
  const [phase, setPhase] = useState<Phase>('search');

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Enter Application Number, Beneficiary ID, or Aadhaar');
      return;
    }
    setSearching(true);
    setError('');
    await sleep(1000);

    const q = query.trim().toLowerCase();
    const match = beneficiaries.find(b =>
      b.applicationId?.toLowerCase().includes(q) ||
      b.beneficiaryId?.toLowerCase().includes(q) ||
      b.aadhaar.replace(/\s/g, '').includes(q.replace(/\s/g, '')) ||
      b.name.toLowerCase().includes(q)
    );

    setSearching(false);
    if (match) {
      setFound(match);
      setPhase('found');
    } else {
      setError('No beneficiary found. Try another ID or name.');
    }
  };

  const handleProceed = () => {
    navigate('/verification', { state: { fromKyc: true, beneficiaryName: found?.name } });
  };

  if (phase === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full gradient-success flex items-center justify-center mb-6 shadow-lg shadow-green-200"
        >
          <span className="material-icons-round text-white text-4xl">check</span>
        </motion.div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Verification Successful</h1>
        <p className="text-gray-500 text-center mb-8">Next payment will be processed.</p>
        <Button fullWidth size="xl" onClick={() => navigate('/dashboard')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="bg-white border-b border-gray-100">
        <PageHeader
          title="Existing Beneficiary KYC"
          subtitle="For already enrolled beneficiaries"
        />
      </div>

      <div className="flex-1 p-5">
        {phase === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-sm text-gray-500">
              Search by Application Number, Beneficiary ID, or Aadhaar.
            </p>

            <Input
              label="Application Number"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setError('');
              }}
              placeholder="OR Beneficiary ID OR Aadhaar"
              error={error}
              leftIcon={<span className="material-icons-round text-lg">search</span>}
            />

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
              Demo tip: try <strong>Lakshmi</strong>, <strong>GLK20260000125</strong>, or{' '}
              <strong>9012</strong>
            </div>

            <Button fullWidth size="xl" loading={searching} onClick={handleSearch}>
              Search
            </Button>
          </motion.div>
        )}

        {phase === 'found' && found && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-3xl p-5 card-shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={found.photo}
                  alt={found.name}
                  className="w-16 h-16 rounded-2xl bg-blue-50 object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${found.name}&background=005BAC&color=fff`;
                  }}
                />
                <div>
                  <h2 className="text-xl font-black text-gray-900">{found.name}</h2>
                  <p className="text-sm text-gray-500">{found.relationship}</p>
                </div>
              </div>

              <div className="bg-green-50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">Status</p>
                  <p className="text-lg font-black text-green-700">Active</p>
                </div>
                <span className="material-icons-round text-green-500 text-3xl">verified_user</span>
              </div>

              {found.beneficiaryId && (
                <p className="text-xs text-gray-400 mt-3">
                  ID: {found.beneficiaryId}
                </p>
              )}
            </div>

            <Button
              fullWidth
              size="xl"
              icon={<span className="material-icons-round text-xl">face</span>}
              onClick={handleProceed}
            >
              Proceed for Face Verification
            </Button>

            <Button fullWidth size="lg" variant="ghost" onClick={() => setPhase('search')}>
              Search again
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
