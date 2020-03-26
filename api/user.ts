import { HealthRecord, RecordSymptom } from '../components/records/state/types';
import { UserProfile } from '../store/types';
import { logError } from '../util/logger';
import api from './client';
import { APIHealthRecord, APIHealthRecordSymptom } from './types';

export async function getProfile(token: string, id: string) {
  return api
    .get<UserProfile>(`patients/${id}`, {
      headers: {
        token
      }
    })
    .then(res => res.data)
    .catch(e => {
      logError('API_ERROR', JSON.stringify(e, null, 2));
      throw e;
    });
}

export async function editProfile(token: string, profile: UserProfile) {
  return api
    .post(`patients/${profile.id}`, profile, {
      headers: {
        token
      }
    })
    .then(res => res.data)
    .catch(e => {
      logError('API_ERROR', JSON.stringify(e, null, 2));
      throw e;
    });
}

export async function getUserHealthRecords(token: string, id: string) {
  return api
    .get<APIHealthRecord[]>(`patients/${id}/symptoms`, {
      headers: {
        token
      }
    })
    .then(res => res.data)
    .then<HealthRecord[]>(toHealthRecords)
    .catch(e => {
      logError('API_ERROR', JSON.stringify(e, null, 2));
      throw e;
    });
}

export async function addUserHealthRecord(
  token: string,
  id: string,
  healthRecord: HealthRecord
) {
  const record = toAPIHealthRecord(healthRecord);

  return api
    .post(`patients/${id}/symptoms`, record, {
      headers: {
        token
      }
    })
    .then(res => res.data)
    .catch(e => {
      logError('API_ERROR', JSON.stringify(e, null, 2));
      throw e;
    });
}

function toAPIHealthRecord(
  healthRecord: HealthRecord
): Exclude<APIHealthRecord, 'sequenceNo' | 'note'> {
  return {
    date: healthRecord.date,
    symptoms: healthRecord.symptoms.map<APIHealthRecordSymptom>(s => {
      return {
        name: s.name,
        severity: s.level
      };
    })
  } as Exclude<APIHealthRecord, 'sequenceNo' | 'note'>;
}

function toHealthRecords(records: APIHealthRecord[]): HealthRecord[] {
  return records.map<HealthRecord>(record => {
    return {
      id: String(record.sequenceNo),
      date: record.date,
      symptoms: record.symptoms.map<RecordSymptom>(symptom => {
        return {
          name: symptom.name,
          level: symptom.severity
        };
      }),
      type: 'health'
    };
  });
}
