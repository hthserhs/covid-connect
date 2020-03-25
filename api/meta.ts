import api from './client';
import { Symptom } from './types';

export async function getSymptoms() {
  const response = await api.get<Symptom[]>('symptoms');
  return response.data;
}
