import api from './client';
import { Location } from './types';

export async function getLocations() {
  const response = await api.get<Location[]>('locations');
  return response.data;
}
