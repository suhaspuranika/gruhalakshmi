import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AppState, Beneficiary } from '../types';
import beneficiaryData from '../data/beneficiary.json';

interface AppContextType extends AppState {
  setLanguage: (lang: 'en' | 'kn') => void;
  login: () => void;
  logout: () => void;
  setDarkMode: (val: boolean) => void;
  setRegistrationStep: (step: number) => void;
  setVerificationResult: (result: 'success' | 'failed' | null) => void;
  updateBeneficiary: (data: Partial<Beneficiary>) => void;
}

const defaultState: AppState = {
  language: 'en',
  isLoggedIn: false,
  beneficiary: null,
  darkMode: false,
  registrationStep: 1,
  verificationResult: null,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('gruhalakshmi_state');
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
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
      beneficiary: beneficiaryData as Beneficiary,
    }));

  const logout = () =>
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      beneficiary: null,
    }));

  const setDarkMode = (val: boolean) =>
    setState(prev => ({ ...prev, darkMode: val }));

  const setRegistrationStep = (step: number) =>
    setState(prev => ({ ...prev, registrationStep: step }));

  const setVerificationResult = (result: 'success' | 'failed' | null) =>
    setState(prev => ({ ...prev, verificationResult: result }));

  const updateBeneficiary = (data: Partial<Beneficiary>) =>
    setState(prev => ({
      ...prev,
      beneficiary: prev.beneficiary ? { ...prev.beneficiary, ...data } : null,
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
        updateBeneficiary,
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
