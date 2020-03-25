import { UserProfile } from '../store/types';
import { logError } from '../util/logger';
import api from './client';

export async function editProfile(authToken: string, profile: UserProfile) {
  return api
    .post<UserProfile>(`patients/${profile.id}`, profile, {
      headers: {
        token: authToken
      }
    })
    .then(res => res.data)
    .catch(e => {
      logError('API_ERROR', JSON.stringify(e, null, 2));
      throw e;
    });
}
