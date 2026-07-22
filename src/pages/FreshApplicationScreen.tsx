import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import PageHeader from '../components/layout/PageHeader';
import ProgressStepper from '../components/ui/ProgressStepper';
import Button from '../components/ui/Button';
import Step2Aadhaar from './register/steps/Step2Aadhaar';
import Step3Face from './register/steps/Step3Face';
import Step5Bank from './register/steps/Step5Bank';
import Step4Personal from './register/steps/Step4Personal';
import Step7Documents from './register/steps/Step7Documents';
import Step8Declaration from './register/steps/Step8Declaration';
import type { RegistrationData } from '../types';

const STEP_LABELS = [
  'Aadhaar',
  'Face',
  'Bank',
  'Eligibility',
  'Documents',
  'Declaration',
];

const defaultData: RegistrationData = {
  mobile: '',
  otp: '',
  aadhaar: '',
  name: '',
  dob: '',
  gender: '',
  address: '',
  village: '',
  ward: '',
  district: '',
  taluk: '',
  pincode: '',
  voterEpic: '',
  bankAccount: '',
  ifsc: '',
  bankName: '',
  branch: '',
  faceRegistered: false,
  declarationSigned: false,
};

export default function FreshApplicationScreen() {
  const navigate = useNavigate();
  const {
    beneficiaries,
    selectedBeneficiaryId,
    setSelectedBeneficiaryId,
    updateBeneficiaryStatus,
  } = useApp();
  const [phase, setPhase] = useState<'select' | 'flow'>(
    selectedBeneficiaryId ? 'flow' : 'select'
  );
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(defaultData);
  const [direction, setDirection] = useState(1);

  const selected = beneficiaries.find(b => b.id === selectedBeneficiaryId);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => {
    if (step === 1) {
      setPhase('select');
      return;
    }
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleStart = (id: string) => {
    const b = beneficiaries.find(x => x.id === id);
    setSelectedBeneficiaryId(id);
    if (b) {
      setData(prev => ({
        ...prev,
        name: b.name,
        mobile: b.mobile,
        gender: b.gender,
        dob: b.dob,
        address: b.address,
        aadhaar: b.aadhaar.replace(/\D/g, '').length === 12 ? b.aadhaar.replace(/\D/g, '') : '',
      }));
    }
    setPhase('flow');
    setStep(1);
  };

  const handleSubmit = () => {
    if (selectedBeneficiaryId) {
      const appNo = `GLK2026${String(Math.floor(Math.random() * 100000)).padStart(8, '0')}`;
      updateBeneficiaryStatus(selectedBeneficiaryId, {
        applicationStatus: 'submitted',
        applicationId: appNo,
      });
      navigate('/application-success', { state: { applicationNo: appNo } });
    }
  };

  const stepProps = { data, updateData, onNext: nextStep, onBack: prevStep };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step2Aadhaar {...stepProps} />;
      case 2: return <Step3Face {...stepProps} />;
      case 3: return <Step5Bank {...stepProps} />;
      case 4: return <Step4Personal {...stepProps} />;
      case 5: return <Step7Documents {...stepProps} />;
      case 6: return <Step8Declaration {...stepProps} onSubmit={handleSubmit} />;
      default: return null;
    }
  };

  if (phase === 'select') {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <div className="bg-white border-b border-gray-100">
          <PageHeader
            title="Fresh Application"
            subtitle="Select a beneficiary to apply"
          />
        </div>

        <div className="flex-1 p-5 space-y-3">
          <p className="text-sm text-gray-500 mb-2">
            Choose who you want to submit a new Gruhalakshmi application for.
          </p>

          {beneficiaries.map((b, i) => (
            <motion.button
              key={b.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleStart(b.id)}
              className={`w-full flex items-center gap-3 p-4 bg-white rounded-2xl card-shadow text-left ${
                selectedBeneficiaryId === b.id ? 'ring-2 ring-[#005BAC]' : ''
              }`}
            >
              <img
                src={b.photo}
                alt={b.name}
                className="w-12 h-12 rounded-full bg-blue-50 object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${b.name}&background=005BAC&color=fff`;
                }}
              />
              <div className="flex-1">
                <p className="font-bold text-gray-900">{b.name}</p>
                <p className="text-xs text-gray-500">{b.relationship}</p>
              </div>
              <span className="material-icons-round text-gray-300">chevron_right</span>
            </motion.button>
          ))}

          {beneficiaries.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No beneficiaries yet. Add one first.</p>
              <Button onClick={() => navigate('/beneficiaries/add')}>Add Beneficiary</Button>
            </div>
          )}

          {selected && (
            <Button fullWidth size="xl" onClick={() => handleStart(selected.id)} className="mt-4">
              Start Application
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="bg-white border-b border-gray-100">
        <PageHeader
          title="Fresh Application"
          subtitle={selected?.name || 'Gruhalakshmi Scheme'}
          showBack={true}
        />
        <ProgressStepper steps={STEP_LABELS} currentStep={step} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
