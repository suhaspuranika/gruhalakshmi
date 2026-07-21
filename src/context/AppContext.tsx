import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppState, ManagedBeneficiary, User, BeneficiaryFormData } from '../types';
import userData from '../data/user.json';
import beneficiariesData from '../data/beneficiaries.json';

interface AppContextType extends AppState {
  setLanguage: (lang: 'en' | 'kn') => void;
  login: () => void;
  logout: () => void;
  setDarkMode: (val: boolean) => void;
  setRegistrationStep: (step: number) => void;
  setVerificationResult: (result: 'success' | 'failed' | null) => void;
  setSelectedBeneficiaryId: (id: string | null) => void;
  addBeneficiary: (data: BeneficiaryFormData) => void;
  updateBeneficiaryStatus: (id: string, updates: Partial<ManagedBeneficiary>) => void;
  registerAccount: (user: Partial<User>) => void;
}

const defaultState: AppState = {
  language: 'en',
  isLoggedIn: false,
  user: null,
  beneficiaries: [],
  darkMode: false,
  registrationStep: 1,
  verificationResult: null,
  selectedBeneficiaryId: null,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('gruhalakshmi_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.beneficiary && !parsed.user) {
          parsed.user = userData;
          delete parsed.beneficiary;
        }
        if (!parsed.beneficiaries) {
          parsed.beneficiaries = beneficiariesData;
        }
        return { ...defaultState, ...parsed };
      } catch {
        return defaultState;
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('gruhalakshmi_state', JSON.stringify(state));
  }, [state]);

  const setLanguage = (lang: 'en' | 'kn') =>
    setState(prev => ({ ...prev, language: lang }));

  const login = () =>
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      user: userData as User,
      beneficiaries: (prev.beneficiaries?.length
        ? prev.beneficiaries
        : beneficiariesData) as ManagedBeneficiary[],
    }));

  const logout = () =>
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      user: null,
      selectedBeneficiaryId: null,
    }));

  const setDarkMode = (val: boolean) =>
    setState(prev => ({ ...prev, darkMode: val }));

  const setRegistrationStep = (step: number) =>
    setState(prev => ({ ...prev, registrationStep: step }));

  const setVerificationResult = (result: 'success' | 'failed' | null) =>
    setState(prev => ({ ...prev, verificationResult: result }));

  const setSelectedBeneficiaryId = (id: string | null) =>
    setState(prev => ({ ...prev, selectedBeneficiaryId: id }));

  const addBeneficiary = (data: BeneficiaryFormData) => {
    const newBeneficiary: ManagedBeneficiary = {
      id: `b${Date.now()}`,
      name: data.name,
      mobile: data.mobile,
      relationship: data.relationship,
      aadhaar: data.aadhaar
        ? `XXXX XXXX ${data.aadhaar.slice(-4)}`
        : 'XXXX XXXX ----',
      gender: data.gender,
      dob: data.dob,
      address: data.address,
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}&backgroundColor=b6e3f4`,
      applicationStatus: 'eligible_not_applied',
      faceRegistered: false,
    };
    setState(prev => ({
      ...prev,
      beneficiaries: [...prev.beneficiaries, newBeneficiary],
    }));
  };

  const updateBeneficiaryStatus = (id: string, updates: Partial<ManagedBeneficiary>) =>
    setState(prev => ({
      ...prev,
      beneficiaries: prev.beneficiaries.map(b =>
        b.id === id ? { ...b, ...updates } : b
      ),
    }));

  const registerAccount = (partial: Partial<User>) =>
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      user: {
        id: `u${Date.now()}`,
        name: partial.name || '',
        mobile: partial.mobile || '',
        email: partial.email || '',
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(partial.name || 'User')}&backgroundColor=b6e3f4`,
      },
      beneficiaries: beneficiariesData as ManagedBeneficiary[],
    }));

  return (
    <AppContext.Provider
      value={{
        ...state,
        setLanguage,
        login,
        logout,
        setDarkMode,
        setRegistrationStep,
        setVerificationResult,
        setSelectedBeneficiaryId,
        addBeneficiary,
        updateBeneficiaryStatus,
        registerAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
