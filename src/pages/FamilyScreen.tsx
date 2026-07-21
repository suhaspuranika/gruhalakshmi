import { useState } from 'react';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import FamilyCard from '../components/ui/FamilyCard';
import BottomSheet from '../components/ui/BottomSheet';
import StatusBadge from '../components/ui/StatusBadge';
import familyData from '../data/family.json';
import type { FamilyMember } from '../types';

export default function FamilyScreen() {
  const [members] = useState<FamilyMember[]>(familyData as FamilyMember[]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="gradient-primary px-5 pt-12 pb-16 relative overflow-hidden">
        <motion.div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} />
        <div className="relative z-10">
          <h1 className="text-2xl font-black text-white mb-1">Beneficiaries</h1>
          <p className="text-blue-200 text-sm">{members.length} beneficiaries mapped</p>

          {/* Beneficiary structure */}
          <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-2xl p-3">
            <div className="flex items-center gap-3 flex-wrap">
              {members.map((m, i) => (
                <div key={m.id} className="flex flex-col items-center gap-1 relative">
                  {i > 0 && (
                    <div className="absolute left-0 top-5 -translate-x-3 w-3 h-px bg-white/30" />
                  )}
                  <div className="relative">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-11 h-11 rounded-full border-2 bg-white/20"
                      style={{ borderColor: m.isHead ? '#F58220' : 'rgba(255,255,255,0.4)' }}
                      onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${m.name}&background=fff&color=005BAC`; }}
                    />
                    {m.isHead && <span className="absolute -top-1 -right-1 text-xs">👑</span>}
                    {m.faceRegistered && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center border border-white">
                        <span className="material-icons-round text-white" style={{ fontSize: 10 }}>check</span>
                      </span>
                    )}
                  </div>
                  <p className="text-white/80 text-[9px] font-medium text-center max-w-12 leading-tight">
                    {m.name.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-8 pb-4">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-4 card-shadow-lg mb-4"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Eligible', value: members.filter(m => m.eligibility === 'eligible').length, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Verified', value: members.filter(m => m.status === 'verified').length, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Face Done', value: members.filter(m => m.faceRegistered).length, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map(stat => (
              <div key={stat.label} className={`${stat.bg} rounded-xl p-3`}>
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Member list */}
        <div className="space-y-3">
          {members.map((member, i) => (
            <FamilyCard
              key={member.id}
              member={member}
              index={i}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      {/* Member detail sheet */}
      <BottomSheet
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title="Beneficiary Profile"
        height="auto"
      >
        {selectedMember && (
          <div className="p-5 space-y-4">
            {/* Profile header */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={selectedMember.photo}
                  alt={selectedMember.name}
                  className="w-20 h-20 rounded-2xl bg-blue-50 object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${selectedMember.name}&background=005BAC&color=fff&size=80`; }}
                />
                {selectedMember.isHead && (
                  <span className="absolute -top-2 -right-2 text-xl">👑</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">{selectedMember.name}</h3>
                <p className="text-sm text-gray-500">{selectedMember.relationship} • Age {selectedMember.age}</p>
                <div className="flex gap-2 mt-2">
                  <StatusBadge status={selectedMember.eligibility === 'eligible' ? 'eligible' : 'pending'} size="sm" />
                  <StatusBadge status={selectedMember.status === 'verified' ? 'verified' : 'pending'} size="sm" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              {[
                { icon: 'credit_card', label: 'Aadhaar', value: selectedMember.aadhaar },
                { icon: 'face', label: 'Face Registration', value: selectedMember.faceRegistered ? 'Completed' : 'Pending' },
                { icon: 'verified', label: 'Eligibility', value: selectedMember.eligibility === 'eligible' ? 'Eligible for scheme' : 'Under review' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <span className="material-icons-round text-gray-400 text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {!selectedMember.faceRegistered && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-2">
                <span className="material-icons-round text-yellow-500 text-sm">warning</span>
                <p className="text-xs text-yellow-700">Face registration pending. Complete face scan to activate benefits.</p>
              </div>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
