import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import type { RegistrationData } from '../../../types';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface DocItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  required: boolean;
}

const documents: DocItem[] = [
  { id: 'aadhaar', name: 'Aadhaar Card', description: 'Front & back of Aadhaar', icon: 'credit_card', color: 'text-blue-600', bgColor: 'bg-blue-50', required: true },
  { id: 'voter', name: 'Voter ID', description: 'Front & back of Voter ID card', icon: 'how_to_vote', color: 'text-indigo-600', bgColor: 'bg-indigo-50', required: true },
  { id: 'bank', name: 'Bank Passbook', description: 'First page with account details', icon: 'account_balance', color: 'text-green-600', bgColor: 'bg-green-50', required: true },
  { id: 'ration', name: 'Ration Card', description: 'Family ration card copy', icon: 'receipt', color: 'text-orange-600', bgColor: 'bg-orange-50', required: true },
  { id: 'income', name: 'Income Certificate', description: 'Issued by competent authority', icon: 'description', color: 'text-purple-600', bgColor: 'bg-purple-50', required: false },
];

export default function Step7Documents({ onNext }: StepProps) {
  const [uploaded, setUploaded] = useState<Set<string>>(new Set(['aadhaar']));
  const [dragging, setDragging] = useState<string | null>(null);

  const mockUpload = (id: string) => {
    setDragging(id);
    setTimeout(() => {
      setDragging(null);
      setUploaded(prev => new Set([...prev, id]));
    }, 1500);
  };

  const requiredDone = documents.filter(d => d.required).every(d => uploaded.has(d.id));

  return (
    <div className="p-5 space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-yellow-600 text-3xl">folder_open</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
        <p className="text-sm text-gray-500 mt-1">Upload required documents for verification</p>
      </motion.div>

      {/* Progress */}
      <div className="bg-blue-50 rounded-2xl p-3 flex items-center gap-3">
        <div className="flex-1">
          <div className="flex justify-between mb-1.5">
            <span className="text-xs font-semibold text-[#005BAC]">Upload Progress</span>
            <span className="text-xs font-bold text-[#005BAC]">{uploaded.size}/{documents.length}</span>
          </div>
          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              animate={{ width: `${(uploaded.size / documents.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Document cards */}
      <div className="space-y-3">
        {documents.map((doc, i) => {
          const isUploaded = uploaded.has(doc.id);
          const isLoading = dragging === doc.id;

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                isUploaded
                  ? 'border-green-200 bg-green-50'
                  : isLoading
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-dashed border-gray-200 bg-white'
              }`}
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => !isUploaded && !isLoading && mockUpload(doc.id)}
                onDragOver={e => { e.preventDefault(); }}
                onDrop={() => !isUploaded && !isLoading && mockUpload(doc.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl ${isUploaded ? 'bg-green-100' : doc.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <span className={`material-icons-round text-xl ${isUploaded ? 'text-green-600' : doc.color}`}>
                      {isUploaded ? 'cloud_done' : isLoading ? 'cloud_upload' : doc.icon}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900 text-sm">{doc.name}</span>
                      {doc.required && !isUploaded && (
                        <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">Required</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{doc.description}</p>
                  </div>
                  <div>
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-[#005BAC] border-t-transparent rounded-full animate-spin" />
                    ) : isUploaded ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="material-icons-round text-white text-sm">check</span>
                      </motion.div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <span className="material-icons-round text-gray-400 text-sm">add</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview */}
                <AnimatePresence>
                  {isUploaded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 pt-3 border-t border-green-200"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-8 bg-green-100 rounded-lg flex items-center px-3 gap-2">
                          <span className="material-icons-round text-green-600 text-sm">image</span>
                          <span className="text-xs text-green-700 font-medium">{doc.name.toLowerCase().replace(/ /g, '_')}.jpg</span>
                        </div>
                        <span className="text-xs text-green-600 font-semibold">1.2 MB</span>
                        <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full font-semibold">✓ Uploaded</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Upload hint */}
                {!isUploaded && !isLoading && (
                  <div className="mt-3 flex items-center justify-center gap-2 border border-dashed border-gray-200 rounded-xl p-2">
                    <span className="material-icons-round text-gray-300 text-sm">cloud_upload</span>
                    <p className="text-xs text-gray-400">Tap to upload or drag & drop</p>
                  </div>
                )}
              </div>

              {/* Loading overlay */}
              {isLoading && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                  className="absolute bottom-0 left-0 h-1 gradient-primary"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <Button fullWidth size="xl" onClick={onNext} disabled={!requiredDone}
        icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
        Continue ({uploaded.size} uploaded)
      </Button>
    </div>
  );
}
