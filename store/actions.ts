import nanoid from 'nanoid/non-secure';
import {
  HealthRecord,
  TransportMode,
  TravelRecord,
  UserProfile
} from './types';

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

export interface SetAuthToken {
  type: 'set_auth_token';
  payload: {
    authToken: string;
  };
}

export interface ClearAuthToken {
  type: 'clear_auth_token';
}

export interface ClearUserData {
  type: 'clear_user_data';
}

export interface SetUserProfileCompleted {
  type: 'set_user_profile_completed';
  payload: {
    userProfileCompleted: boolean;
  };
}

export interface UpdateUserProfile {
  type: 'update_user_profile';
  payload: {
    userProfile: UserProfile;
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

export function setAuthToken(authToken: string): SetAuthToken {
  return {
    type: 'set_auth_token',
    payload: {
      authToken
    }
  };
}

export function clearAuthToken(): ClearAuthToken {
  return {
    type: 'clear_auth_token'
  };
}

export function clearUserData(): ClearUserData {
  return {
    type: 'clear_user_data'
  };
}

export function setUserProfileCompleted(
  userProfileCompleted: boolean
): SetUserProfileCompleted {
  return {
    type: 'set_user_profile_completed',
    payload: {
      userProfileCompleted
    }
  };
}

export function updateUserProfile(userProfile: UserProfile): UpdateUserProfile {
  return {
    type: 'update_user_profile',
    payload: {
      userProfile
    }
  };
}

export type Action =
  | AddRecord
  | AddTravelRecord
  | SetAuthToken
  | ClearAuthToken
  | ClearUserData
  | SetUserProfileCompleted
  | UpdateUserProfile;
