import { cn } from '../../lib/utils';

interface ProgressStepperProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full px-4 py-3">
      {/* Progress bar */}
      <div className="relative flex items-center mb-3">
        <div className="absolute left-0 right-0 h-1 bg-gray-100 rounded-full z-0" />
        <div
          className="absolute left-0 h-1 bg-[#005BAC] rounded-full z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        <div className="relative z-10 flex justify-between w-full">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300',
                i + 1 < currentStep
                  ? 'bg-[#005BAC] border-[#005BAC] text-white'
                  : i + 1 === currentStep
                  ? 'bg-white border-[#005BAC] text-[#005BAC]'
                  : 'bg-white border-gray-200 text-gray-400'
              )}
            >
              {i + 1 < currentStep ? (
                <span className="material-icons-round text-sm">check</span>
              ) : (
                i + 1
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step label */}
      <div className="flex justify-center">
        <span className="text-xs font-semibold text-[#005BAC]">
          Step {currentStep}: {steps[currentStep - 1]}
        </span>
      </div>
    </div>
  );
}
