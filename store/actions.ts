import nanoid from 'nanoid/non-secure';
import {
  HealthRecord,
  TransportMode,
  TravelRecord,
  UserProfile,
  UserType
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

export interface UpdateMobileNumber {
  type: 'update_mobile_number';
  payload: {
    mobileNumber: string;
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

export interface SetUserType {
  type: 'set_user_type';
  payload: {
    userType: UserType;
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

export function updateMobileNumber(mobileNumber: string): UpdateMobileNumber {
  return {
    type: 'update_mobile_number',
    payload: {
      mobileNumber
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

export function setUserType(userType: UserType): SetUserType {
  return {
    type: 'set_user_type',
    payload: {
      userType
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
  | UpdateMobileNumber
  | SetAuthToken
  | ClearAuthToken
  | ClearUserData
  | SetUserType
  | UpdateUserProfile;
