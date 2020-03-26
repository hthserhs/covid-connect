import nanoid from 'nanoid/non-secure';
import { APISymptom } from '../../../api/types';
import { HealthRecord, TransportMode, TravelRecord } from './types';

interface UpdateSymptoms {
  type: 'update_symptoms';
  payload: {
    symptoms: APISymptom[];
  };
}

interface UpdateHealthRecords {
  type: 'update_health_records';
  payload: {
    records: HealthRecord[];
  };
}

interface AddHealthRecord {
  type: 'add_health_record';
  payload: {
    record: HealthRecord;
  };
}

interface AddTravelRecord {
  type: 'add_travel_record';
  payload: {
    record: TravelRecord;
  };
}

export function updateSymptoms(symptoms: APISymptom[]): UpdateSymptoms {
  return {
    type: 'update_symptoms',
    payload: {
      symptoms
    }
  };
}

export function updateHealthRecords(
  records: HealthRecord[]
): UpdateHealthRecords {
  return {
    type: 'update_health_records',
    payload: {
      records
    }
  };
}

export function addHealthRecord(record: HealthRecord): AddHealthRecord {
  return {
    type: 'add_health_record',
    payload: {
      record
    }
  };
}

export function addTravelRecord(
  date: number,
  from: string,
  to: string,
  transportMode: TransportMode,
  transportId: string
): AddTravelRecord {
  return {
    type: 'add_travel_record',
    payload: {
      record: {
        id: nanoid(),
        date,
        from,
        to,
        transportMode,
        transportId,
        type: 'travel'
      }
    }
  };
}

export type Action =
  | UpdateHealthRecords
  | UpdateSymptoms
  | AddHealthRecord
  | AddTravelRecord;
