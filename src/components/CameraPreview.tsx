import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CameraPreviewProps {
  onComplete: (success: boolean) => void;
  steps?: string[];
  autoStart?: boolean;
}

const defaultSteps = ['Align Face', 'Blink', 'Turn Left', 'Turn Right', 'Smile'];

export default function CameraPreview({
  onComplete,
  steps = defaultSteps,
  autoStart = true,
}: CameraPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scanning, setScanning] = useState(autoStart);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Stable ref so the effect never re-runs because onComplete changed
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  const stepIcons = ['face', 'visibility', 'arrow_back', 'arrow_forward', 'sentiment_very_satisfied'];
  const stepColors = ['#005BAC', '#22C55E', '#F58220', '#8B5CF6', '#EF4444'];

  // Step advancement
  useEffect(() => {
    if (!scanning) return;
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
    // All steps done — move to AI processing
    setScanning(false);
    setProcessing(true);
  }, [currentStep, scanning, steps.length]);

  // AI processing timer — runs only once when processing becomes true
  useEffect(() => {
    if (!processing) return;
    const timer = setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      const success = Math.random() > 0.2; // 80% success
      // Small delay so the user sees the completed state briefly before callback
      setTimeout(() => onCompleteRef.current(success), 800);
    }, 3000);
    return () => clearTimeout(timer);
  }, [processing]);

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="relative w-full h-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Fake camera feed */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/5 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4 }}
          />
        ))}
      </div>

      {/* Face Oval Frame */}
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 320 }}>
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0"
          style={{ borderRadius: '50% / 43%' }}
          animate={{
            boxShadow: completed
              ? ['0 0 0 0px #22C55E40', '0 0 0 24px #22C55E00']
              : [
                  `0 0 0 0px ${stepColors[Math.min(currentStep, stepColors.length - 1)]}40`,
                  `0 0 0 20px ${stepColors[Math.min(currentStep, stepColors.length - 1)]}00`,
                ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Oval border */}
        <motion.div
          className="absolute inset-0 border-4"
          style={{ borderRadius: '50% / 43%' }}
          animate={{
            borderColor: completed
              ? '#22C55E'
              : stepColors[Math.min(currentStep, stepColors.length - 1)],
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner brackets */}
        {[
          { top: 4, left: 4 },
          { top: 4, right: 4 },
          { bottom: 4, left: 4 },
          { bottom: 4, right: 4 },
        ].map((pos, i) => (
          <div key={i} className="absolute w-8 h-8" style={pos}>
            <div
              className="absolute w-6 h-6"
              style={{
                borderTop: i < 2 ? '2px solid #005BAC' : 'none',
                borderBottom: i >= 2 ? '2px solid #005BAC' : 'none',
                borderLeft: i % 2 === 0 ? '2px solid #005BAC' : 'none',
                borderRight: i % 2 === 1 ? '2px solid #005BAC' : 'none',
                borderRadius: 4,
              }}
            />
          </div>
        ))}

        {/* Face silhouette */}
        <div className="w-32 h-40 rounded-full bg-white/10 flex items-center justify-center">
          <span className="material-icons-round text-white/20" style={{ fontSize: '80px' }}>person</span>
        </div>

        {/* Scanning laser */}
        {scanning && (
          <motion.div
            className="absolute left-4 right-4 h-0.5 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${stepColors[Math.min(currentStep, stepColors.length - 1)]}, transparent)`,
            }}
            animate={{ top: ['15%', '85%', '15%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* AI Processing overlay */}
        <AnimatePresence>
          {processing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ borderRadius: '50% / 43%', background: 'rgba(0,91,172,0.75)' }}
            >
              <div className="text-center text-white">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2"
                  style={{
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                <p className="text-xs font-bold">AI Processing...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completed overlay */}
        <AnimatePresence>
          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ borderRadius: '50% / 43%', background: 'rgba(34,197,94,0.3)' }}
            >
              <div className="text-center text-white">
                <span className="material-icons-round text-green-400" style={{ fontSize: 48 }}>check_circle</span>
                <p className="text-xs font-bold mt-1">Done!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom instructions */}
      <div className="absolute bottom-32 left-0 right-0 flex flex-col items-center gap-4 px-6">
        <AnimatePresence mode="wait">
          {!processing && !completed && currentStep < steps.length && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                style={{ background: `${stepColors[Math.min(currentStep, stepColors.length - 1)]}40` }}
              >
                <span className="material-icons-round text-white text-2xl">
                  {stepIcons[Math.min(currentStep, stepIcons.length - 1)]}
                </span>
              </div>
              <p className="text-white font-bold text-lg">{steps[currentStep]}</p>
              <p className="text-white/60 text-sm mt-1">Step {currentStep + 1} of {steps.length}</p>
            </motion.div>
          )}
          {processing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-white font-bold text-xl">AI Matching...</p>
              <p className="text-white/60 text-sm mt-1">Analyzing facial features</p>
            </motion.div>
          )}
          {completed && !processing && (
            <motion.div
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-green-400 font-bold text-xl">Verification Complete</p>
              <p className="text-white/60 text-sm mt-1">Processing result...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: completed ? '#22C55E' : '#005BAC' }}
            animate={{ width: `${completed ? 100 : processing ? 90 : progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Step dots */}
        <div className="flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background:
                  i < currentStep
                    ? '#22C55E'
                    : i === currentStep
                    ? '#005BAC'
                    : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2 bg-black/40 rounded-full px-3 py-1.5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white text-xs font-semibold">LIVE</span>
        </div>
        <div className="bg-black/40 rounded-full px-3 py-1.5">
          <span className="text-white text-xs font-semibold">AI Camera</span>
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
