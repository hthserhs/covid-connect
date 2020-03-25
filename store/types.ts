export interface State {
  records: HealthRecord[];
  travelRecords: TravelRecord[];
  authToken: string | null;
  userProfileCompleted: boolean;
  userProfile: UserProfile | null;
}

export type RecordType = 'travel' | 'health';

export enum TransportMode {
  Flight = 'flight',
  Train = 'train',
  Bus = 'bus',
  Taxi = 'taxi',
  Other = 'other'
}

export enum SeverityLevel {
  Unspecified = 'unspecified',
  No = 'no',
  Low = 'low',
  Mild = 'mild',
  High = 'high'
}

export type ValueSeverityLevel = Exclude<
  SeverityLevel,
  SeverityLevel.Unspecified
>;

export interface HealthRecord {
  id: string;
  date: number;
  symptoms: RecordSymptom[];
  type: RecordType;
}

export interface TravelRecord {
  id: string;
  date: number;
  from: string;
  to: string;
  transportMode: TransportMode;
  transportId: string; // flight/train/bus number etc.
  type: RecordType;
}

export interface RecordSymptom<T = SeverityLevel> {
  name: string;
  level: T;
}

export interface SeverityLevelItem {
  text: string;
  color: string;
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
}
