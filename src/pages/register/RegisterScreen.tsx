import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressStepper from '../../components/ui/ProgressStepper';
import PageHeader from '../../components/layout/PageHeader';
import Step1Mobile from './steps/Step1Mobile';
import Step2Aadhaar from './steps/Step2Aadhaar';
import Step3Face from './steps/Step3Face';
import Step4Personal from './steps/Step4Personal';
import Step5Bank from './steps/Step5Bank';
import Step6Family from './steps/Step6Family';
import Step7Documents from './steps/Step7Documents';
import Step8Declaration from './steps/Step8Declaration';
import type { RegistrationData } from '../../types';

const STEP_LABELS = [
  'Mobile',
  'Aadhaar',
  'Face',
  'Personal',
  'Bank',
  'Family',
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
  bankAccount: '',
  ifsc: '',
  bankName: '',
  branch: '',
  faceRegistered: false,
  declarationSigned: false,
};

export default function RegisterScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(defaultData);
  const [direction, setDirection] = useState(1);

  const updateData = (updates: Partial<RegistrationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, 8));
  };

  const prevStep = () => {
    if (step === 1) {
      navigate(-1);
      return;
    }
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const stepProps = { data, updateData, onNext: nextStep, onBack: prevStep };

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Mobile {...stepProps} />;
      case 2: return <Step2Aadhaar {...stepProps} />;
      case 3: return <Step3Face {...stepProps} />;
      case 4: return <Step4Personal {...stepProps} />;
      case 5: return <Step5Bank {...stepProps} />;
      case 6: return <Step6Family {...stepProps} />;
      case 7: return <Step7Documents {...stepProps} />;
      case 8: return <Step8Declaration {...stepProps} onSubmit={() => navigate('/application-success')} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <PageHeader
          title="New Registration"
          subtitle="Gruhalakshmi Scheme"
          showBack={true}
        />
        <ProgressStepper steps={STEP_LABELS} currentStep={step} />
      </div>

      {/* Step content */}
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
