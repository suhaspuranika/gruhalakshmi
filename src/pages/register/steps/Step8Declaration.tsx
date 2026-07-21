import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import type { RegistrationData } from '../../../types';
import { sleep } from '../../../lib/utils';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function Step8Declaration({ updateData, onSubmit }: StepProps) {
  const [agreed, setAgreed] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = '#005BAC';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      lastPos.current = getPos(e);
    };
    const draw = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPos.current = pos;
      setHasSigned(true);
    };
    const stop = () => { isDrawing.current = false; };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stop);

    return () => {
      canvas.removeEventListener('mousedown', start);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stop);
      canvas.removeEventListener('touchstart', start);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stop);
    };
  }, []);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    updateData({ declarationSigned: true });
    await sleep(2000);
    onSubmit();
  };

  return (
    <div className="p-5 space-y-5 pb-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-red-500 text-3xl">gavel</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Declaration</h2>
        <p className="text-sm text-gray-500 mt-1">Read and agree to the declaration</p>
      </motion.div>

      {/* Declaration text */}
      <div className="bg-gray-50 rounded-2xl p-4 max-h-48 overflow-y-auto">
        <p className="text-sm font-bold text-gray-800 mb-2">Declaration by Applicant</p>
        <p className="text-xs text-gray-600 leading-relaxed">
          I, the undersigned, hereby declare that the information provided in this application form is true, 
          correct and complete to the best of my knowledge and belief. I understand that if any information 
          is found to be false or incorrect, my application may be rejected and I may be liable for action 
          under applicable laws.
        </p>
        <p className="text-xs text-gray-600 leading-relaxed mt-2">
          I hereby consent to the verification of my Aadhaar details, biometric data, bank account details 
          and other information provided by me for the purpose of the Gruhalakshmi Scheme. I understand 
          that the benefit of ₹2,000 per month will be credited to my registered bank account subject to 
          successful monthly face verification.
        </p>
        <p className="text-xs text-gray-600 leading-relaxed mt-2">
          I confirm that I am a female head of household and eligible for this scheme as per the 
          Government of Karnataka guidelines.
        </p>
      </div>

      {/* Checkbox */}
      <button
        onClick={() => setAgreed(!agreed)}
        className="flex items-start gap-3 w-full text-left"
      >
        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
          agreed ? 'bg-[#005BAC] border-[#005BAC]' : 'border-gray-300'
        }`}>
          {agreed && <span className="material-icons-round text-white text-sm">check</span>}
        </div>
        <p className="text-sm text-gray-700 font-medium">
          I have read and agree to the declaration. I confirm all information provided is accurate.
        </p>
      </button>

      {/* Signature pad */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: agreed ? 1 : 0.5 }}
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-gray-700">Signature</label>
          <button onClick={clearSignature} className="text-xs text-[#005BAC] font-medium flex items-center gap-1">
            <span className="material-icons-round text-sm">clear</span> Clear
          </button>
        </div>
        <div className="relative border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden bg-white">
          <canvas
            ref={canvasRef}
            width={340}
            height={120}
            className="w-full cursor-crosshair touch-none"
          />
          {!hasSigned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-300 text-sm font-medium">Draw your signature here</p>
            </div>
          )}
          {/* Signature line */}
          <div className="absolute bottom-6 left-6 right-6 border-b border-gray-200" />
        </div>
        {hasSigned && (
          <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
            <span className="material-icons-round text-sm">check_circle</span>
            Signature captured
          </p>
        )}
      </motion.div>

      <Button
        fullWidth size="xl"
        loading={submitting}
        disabled={!agreed || !hasSigned}
        onClick={handleSubmit}
        variant="success"
        icon={<span className="material-icons-round text-xl">send</span>}
        iconPosition="right"
      >
        Submit Application
      </Button>
    </div>
  );
}
