export interface State {
  records: Record[];
}

export type RecordType = 'travel' | 'health' | 'location';

export interface Record {
  id: string;
  date: number;
  symptoms: Symptom[];
  type: RecordType;
}

export interface Symptom {
  name: string;
  level: number;
}

export interface SeverityLevel {
  text: string;
  color: string;
}
