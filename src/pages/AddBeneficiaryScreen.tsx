import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useApp } from '../context/AppContext';
import { sleep } from '../lib/utils';
import type { BeneficiaryFormData } from '../types';

const relationships = ['Mother', 'Wife', 'Aunt', 'Sister', 'Daughter', 'Grandmother', 'Other'];

const defaultForm: BeneficiaryFormData = {
  name: '',
  mobile: '',
  relationship: '',
  aadhaar: '',
  gender: '',
  dob: '',
  address: '',
};

export default function AddBeneficiaryScreen() {
  const navigate = useNavigate();
  const { addBeneficiary } = useApp();
  const [form, setForm] = useState<BeneficiaryFormData>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BeneficiaryFormData, string>>>({});
  const [saving, setSaving] = useState(false);

  const update = (field: keyof BeneficiaryFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof BeneficiaryFormData, string>> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (form.mobile.length !== 10) next.mobile = 'Enter a valid 10-digit mobile';
    if (!form.relationship) next.relationship = 'Select relationship';
    if (form.aadhaar.replace(/\s/g, '').length !== 12) next.aadhaar = 'Enter 12-digit Aadhaar';
    if (!form.gender) next.gender = 'Select gender';
    if (!form.dob.trim()) next.dob = 'Date of birth is required';
    if (!form.address.trim()) next.address = 'Address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await sleep(800);
    addBeneficiary(form);
    setSaving(false);
    navigate('/beneficiaries');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <div className="bg-white border-b border-gray-100">
        <PageHeader title="Add Beneficiary" subtitle="Create beneficiary profile" />
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-gray-500 mb-4">
            Add a beneficiary profile only. You can start a Gruhalakshmi application later.
          </p>
        </motion.div>

        <Input
          label="Name"
          value={form.name}
          onChange={e => update('name', e.target.value)}
          placeholder="Beneficiary full name"
          error={errors.name}
          leftIcon={<span className="material-icons-round text-lg">badge</span>}
        />

        <Input
          label="Mobile"
          type="tel"
          maxLength={10}
          value={form.mobile}
          onChange={e => update('mobile', e.target.value.replace(/\D/g, ''))}
          placeholder="10-digit mobile number"
          error={errors.mobile}
          leftIcon={<span className="material-icons-round text-lg">phone</span>}
        />

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1.5">Relationship</p>
          <div className="flex flex-wrap gap-2">
            {relationships.map(r => (
              <button
                key={r}
                type="button"
                onClick={() => update('relationship', r)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  form.relationship === r
                    ? 'bg-[#005BAC] text-white border-[#005BAC]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          {errors.relationship && (
            <p className="text-xs text-red-500 mt-1">{errors.relationship}</p>
          )}
        </div>

        <Input
          label="Aadhaar"
          type="tel"
          maxLength={12}
          value={form.aadhaar}
          onChange={e => update('aadhaar', e.target.value.replace(/\D/g, ''))}
          placeholder="12-digit Aadhaar number"
          error={errors.aadhaar}
          leftIcon={<span className="material-icons-round text-lg">credit_card</span>}
        />

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1.5">Gender</p>
          <div className="flex gap-2">
            {['Female', 'Male', 'Other'].map(g => (
              <button
                key={g}
                type="button"
                onClick={() => update('gender', g)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  form.gender === g
                    ? 'bg-[#005BAC] text-white border-[#005BAC]'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          {errors.gender && <p className="text-xs text-red-500 mt-1">{errors.gender}</p>}
        </div>

        <Input
          label="DOB"
          type="date"
          value={form.dob}
          onChange={e => update('dob', e.target.value)}
          error={errors.dob}
          leftIcon={<span className="material-icons-round text-lg">cake</span>}
        />

        <Input
          label="Address"
          value={form.address}
          onChange={e => update('address', e.target.value)}
          placeholder="Full residential address"
          error={errors.address}
          leftIcon={<span className="material-icons-round text-lg">home</span>}
        />

        <Button
          fullWidth
          size="xl"
          loading={saving}
          onClick={handleSave}
          icon={<span className="material-icons-round text-xl">save</span>}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
