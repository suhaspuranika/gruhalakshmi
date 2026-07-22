export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  photo: string;
}

export interface ManagedBeneficiary {
  id: string;
  name: string;
  mobile: string;
  relationship: string;
  aadhaar: string;
  gender: string;
  dob: string;
  address: string;
  photo: string;
  applicationStatus:
    | 'submitted'
    | 'kyc_pending'
    | 'eligible_not_applied'
    | 'approved'
    | 'rejected'
    | 'draft'
    | 'active';
  applicationId?: string;
  beneficiaryId?: string;
  faceRegistered: boolean;
}

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
  beneficiaryId: string;
  beneficiaryName: string;
  month: string;
  year: number;
  amount: number;
  status: 'released' | 'pending' | 'processing' | 'failed' | 'pending_kyc';
  date: string;
  transactionId: string;
  utrNumber: string;
}

export interface Application {
  id: string;
  applicationNo: string;
  beneficiaryId: string;
  beneficiaryName: string;
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  submittedAt: string;
  type: 'fresh';
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
  type: 'aadhaar' | 'bank-passbook' | 'ration-card' | 'income-certificate' | 'voter-id';
  status: 'uploaded' | 'pending' | 'verified';
  uploadDate: string;
  fileSize: string;
  preview: string;
}

export interface AppState {
  language: 'en' | 'kn';
  isLoggedIn: boolean;
  user: User | null;
  beneficiaries: ManagedBeneficiary[];
  darkMode: boolean;
  registrationStep: number;
  verificationResult: 'success' | 'failed' | null;
  selectedBeneficiaryId: string | null;
}

export interface AccountRegistrationData {
  name: string;
  mobile: string;
  email: string;
  password: string;
  otp: string;
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
  voterEpic: string;
  bankAccount: string;
  ifsc: string;
  bankName: string;
  branch: string;
  faceRegistered: boolean;
  declarationSigned: boolean;
}

export interface BeneficiaryFormData {
  name: string;
  mobile: string;
  relationship: string;
  aadhaar: string;
  gender: string;
  dob: string;
  address: string;
}
