export interface Beneficiary {
  id: string;
  name: string;
  mobile: string;
  aadhaar: string;
  maskedAadhaar: string;
  dob: string;
  gender: string;
  address: string;
  village: string;
  ward: string;
  district: string;
  taluk: string;
  pincode: string;
  photo: string;
  bankAccount: string;
  ifsc: string;
  bankName: string;
  branch: string;
  status: 'verified' | 'pending' | 'rejected';
  beneficiaryId: string;
  applicationId: string;
  verificationDue: string;
  faceRegistered: boolean;
  aadhaarVerified: boolean;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  aadhaar: string;
  eligibility: 'eligible' | 'pending' | 'not-eligible';
  status: 'verified' | 'pending' | 'rejected';
  photo: string;
  faceRegistered: boolean;
  isHead: boolean;
}

export interface Payment {
  id: string;
  month: string;
  year: number;
  amount: number;
  status: 'released' | 'pending' | 'processing' | 'failed';
  date: string;
  transactionId: string;
  utrNumber: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
  icon: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'aadhaar' | 'bank-passbook' | 'ration-card' | 'income-certificate';
  status: 'uploaded' | 'pending' | 'verified';
  uploadDate: string;
  fileSize: string;
  preview: string;
}

export interface AppState {
  language: 'en' | 'kn';
  isLoggedIn: boolean;
  beneficiary: Beneficiary | null;
  darkMode: boolean;
  registrationStep: number;
  verificationResult: 'success' | 'failed' | null;
}

export interface RegistrationData {
  mobile: string;
  otp: string;
  aadhaar: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  village: string;
  ward: string;
  district: string;
  taluk: string;
  pincode: string;
  bankAccount: string;
  ifsc: string;
  bankName: string;
  branch: string;
  faceRegistered: boolean;
  declarationSigned: boolean;
}
