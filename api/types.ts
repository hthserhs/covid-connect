import { SeverityLevel } from '../components/records/state/types';
import { UserProfile } from '../store/types';

export interface ValidateOtpResponse {
  authToken: string;
  isNewUser: boolean;
  patient: UserProfile | null;
}

export interface APISymptom {
  name: string;
  displayName: string;
}

export interface APIHealthRecord {
  date: number;
  note: string;
  sequenceNo: number;
  symptoms: APIHealthRecordSymptom[];
}

export interface APIHealthRecordSymptom {
  name: string;
  severity: SeverityLevel;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  town: null;
  state: string;
  country: string;
  pincode: string;
  locationType: string;
  latitude: null;
  longitude: null;
  contactNumbers: Contact;
}

export interface Contact {
  landline: string;
  fax: string;
  mobilenumber: string;
}
