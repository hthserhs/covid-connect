import {
  CoMorbiditiesItemName,
  CovidRiskFactorItemName
} from '../constants/app';

export interface State {
  authToken: string | null;
}

export interface UserProfile {
  address: string;
  advice: string;
  age: number;
  caseType: string;
  city: string;
  covidState: string;
  dob: number;
  firstName: string;
  gender: string;
  id: number;
  isHighRisk: true;
  lastName: string;
  mobileNumber: string;
  moniorState: string;
  patientId: string;
  pincode: number;
  state: string;
  transmissionType: string;
  coMorbidities: CoMorbiditiesItemName[];
  covidRiskFactors: CovidRiskFactorItemName[];
  quarantineEndDate: number;
  quarantineStartDate: number;
  quarantineType: 'HOME' | 'HOSPITAL';
  locationId: number;
}
