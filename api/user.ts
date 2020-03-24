import { UserProfile } from '../store/types';
import { logError } from '../util/logger';
import api from './client';

export async function register(
  authToken: string,
  profile: Partial<UserProfile>
) {
  return api
    .post('patients', profile, {
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
