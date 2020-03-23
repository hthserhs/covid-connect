export interface State {
  records: HealthRecord[];
  travelRecords: TravelRecord[];
  mobileNumber: string;
}

export type RecordType = 'travel' | 'health';

export enum Symptom {}

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
