export interface ValidateOtpResponse {
  isNewUser: boolean;
  patient: Patient;
}

export interface Patient {
  id: number;
  firstName: null;
  lastName: null;
  mobileNumber: string;
  dob: Date;
  age: number;
  gender: string;
  address: null;
  city: null;
  state: null;
  pincode: number;
  symptoms: Symptom[];
}

export interface Symptom {
  symptom: string;
  severity: string;
  recordTime: string;
  comment: string;
}
