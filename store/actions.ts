import nanoid from 'nanoid/non-secure';
import { HealthRecord, TransportMode, TravelRecord } from './types';

export interface AddRecord {
  type: 'add_record';
  payload: {
    record: HealthRecord;
  };
}

export interface AddTravelRecord {
  type: 'add_travel_record';
  payload: {
    record: TravelRecord;
  };
}

export interface UpdateMobileNumber {
  type: 'update_mobile_number';
  payload: {
    mobileNumber: string;
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

export function updateMobileNumber(mobileNumber: string): UpdateMobileNumber {
  return {
    type: 'update_mobile_number',
    payload: {
      mobileNumber
    }
  };
}

export type Action = AddRecord | AddTravelRecord | UpdateMobileNumber;
