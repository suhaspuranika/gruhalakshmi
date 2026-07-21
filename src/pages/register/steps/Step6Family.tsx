import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import BottomSheet from '../../../components/ui/BottomSheet';
import StatusBadge from '../../../components/ui/StatusBadge';
import Input from '../../../components/ui/Input';
import type { RegistrationData, FamilyMember } from '../../../types';

interface StepProps {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const defaultMembers: FamilyMember[] = [
  {
    id: '1', name: 'Lakshmi Devi', relationship: 'Head of Family', age: 41,
    aadhaar: 'XXXX XXXX 9012', eligibility: 'eligible', status: 'verified',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lakshmi&backgroundColor=b6e3f4',
    faceRegistered: true, isHead: true,
  },
];

export default function Step6Family({ onNext }: StepProps) {
  const [members, setMembers] = useState<FamilyMember[]>(defaultMembers);
  const [showSheet, setShowSheet] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '', relationship: '', age: '', aadhaar: '',
    eligibility: 'pending' as 'eligible' | 'pending' | 'not-eligible',
  });

  const addMember = () => {
    if (!newMember.name) return;
    const member: FamilyMember = {
      id: Date.now().toString(),
      name: newMember.name,
      relationship: newMember.relationship || 'Member',
      age: parseInt(newMember.age) || 0,
      aadhaar: newMember.aadhaar || 'XXXX XXXX XXXX',
      eligibility: newMember.eligibility,
      status: 'pending',
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newMember.name}&backgroundColor=ffd5dc`,
      faceRegistered: false,
      isHead: false,
    };
    setMembers(prev => [...prev, member]);
    setShowSheet(false);
    setNewMember({ name: '', relationship: '', age: '', aadhaar: '', eligibility: 'pending' });
  };

  const relationships = ['Husband', 'Wife', 'Son', 'Daughter', 'Father', 'Mother', 'Sibling', 'Other'];

  return (
    <div className="p-5 space-y-4 pb-24">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-4">
          <span className="material-icons-round text-pink-500 text-3xl">family_restroom</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Family Mapping</h2>
        <p className="text-sm text-gray-500 mt-1">Add your family members to the scheme</p>
      </motion.div>

      {/* Family Tree Visualization */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 relative overflow-hidden">
        <div className="absolute top-2 right-2 opacity-10">
          <span className="material-icons-round text-[#005BAC]" style={{ fontSize: 80 }}>account_tree</span>
        </div>
        <p className="text-xs font-bold text-[#005BAC] uppercase tracking-wider mb-3">Family Structure</p>
        <div className="flex items-start gap-2 flex-wrap">
          {members.map((m, i) => (
            <div key={m.id} className="flex flex-col items-center gap-1 relative">
              {i > 0 && (
                <div className="absolute -left-2 top-5 w-2 h-px bg-blue-300" />
              )}
              <img src={m.photo} alt={m.name}
                className="w-10 h-10 rounded-full border-2 bg-white"
                style={{ borderColor: m.isHead ? '#005BAC' : '#E5E7EB' }}
                onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${m.name}&background=005BAC&color=fff&size=40`; }}
              />
              <p className="text-[9px] text-gray-600 font-medium text-center max-w-12 leading-tight">{m.name.split(' ')[0]}</p>
              {m.isHead && <span className="text-xs">👑</span>}
            </div>
          ))}
          {/* Add placeholder */}
          <button onClick={() => setShowSheet(true)}
            className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center bg-white">
              <span className="material-icons-round text-blue-400 text-lg">add</span>
            </div>
            <p className="text-[9px] text-blue-400 font-medium">Add</p>
          </button>
        </div>
      </div>

      {/* Member cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl card-shadow"
            >
              <div className="relative">
                <img src={member.photo} alt={member.name}
                  className="w-14 h-14 rounded-full bg-blue-50"
                  onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name}&background=005BAC&color=fff`; }}
                />
                {member.isHead && <span className="absolute -top-1 -right-1 text-sm">👑</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-900 text-sm">{member.name}</span>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">{member.relationship} • Age {member.age}</p>
                <div className="flex gap-1.5">
                  <StatusBadge
                    status={member.eligibility === 'eligible' ? 'eligible' : 'pending'} size="sm" />
                  {member.isHead && (
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      Head
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSheet(true)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-blue-300 z-20"
      >
        <span className="material-icons-round text-white text-2xl">person_add</span>
      </motion.button>

      <Button fullWidth size="xl" onClick={onNext}
        icon={<span className="material-icons-round text-xl">arrow_forward</span>} iconPosition="right">
        Continue ({members.length} members)
      </Button>

      {/* Add member bottom sheet */}
      <BottomSheet isOpen={showSheet} onClose={() => setShowSheet(false)} title="Add Family Member">
        <div className="p-5 space-y-4">
          <Input label="Full Name" value={newMember.name}
            onChange={e => setNewMember(p => ({ ...p, name: e.target.value }))}
            placeholder="Member's full name"
            leftIcon={<span className="material-icons-round text-lg">person</span>} />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Relationship</label>
            <div className="flex flex-wrap gap-2">
              {relationships.map(rel => (
                <button key={rel} onClick={() => setNewMember(p => ({ ...p, relationship: rel }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    newMember.relationship === rel
                      ? 'bg-[#005BAC] text-white border-[#005BAC]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}>
                  {rel}
                </button>
              ))}
            </div>
          </div>

          <Input label="Age" type="tel" maxLength={3}
            value={newMember.age}
            onChange={e => setNewMember(p => ({ ...p, age: e.target.value.replace(/\D/g, '') }))}
            placeholder="Age"
            leftIcon={<span className="material-icons-round text-lg">cake</span>} />

          <Input label="Aadhaar Number (Optional)" type="tel" maxLength={14}
            value={newMember.aadhaar}
            onChange={e => setNewMember(p => ({ ...p, aadhaar: e.target.value }))}
            placeholder="XXXX XXXX XXXX"
            leftIcon={<span className="material-icons-round text-lg">credit_card</span>} />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Eligibility</label>
            <div className="flex gap-2">
              {(['eligible', 'pending', 'not-eligible'] as const).map(e => (
                <button key={e} onClick={() => setNewMember(p => ({ ...p, eligibility: e }))}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    newMember.eligibility === e
                      ? 'bg-[#005BAC] text-white border-[#005BAC]'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}>
                  {e === 'eligible' ? 'Eligible' : e === 'pending' ? 'Pending' : 'Not Eligible'}
                </button>
              ))}
            </div>
          </div>

          <Button fullWidth size="lg" onClick={addMember} disabled={!newMember.name}>
            Add Member
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
