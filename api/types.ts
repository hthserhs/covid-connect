import { UserProfile } from '../store/types';

export interface ValidateOtpResponse {
  authToken: string;
  isNewUser: boolean;
  patient: UserProfile | null;
}
