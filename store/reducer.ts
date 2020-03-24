import { Action } from './actions';
import { State, UserType } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add_record':
      return {
        ...state,
        records: [...state.records, action.payload.record]
      };
    case 'add_travel_record':
      return {
        ...state,
        travelRecords: [...state.travelRecords, action.payload.record]
      };
    case 'update_mobile_number':
      return {
        ...state,
        mobileNumber: action.payload.mobileNumber
      };
    case 'set_auth_token':
      return {
        ...state,
        authToken: action.payload.authToken
      };
    case 'clear_auth_token':
      return {
        ...state,
        authToken: null
      };
    case 'set_user_type':
      return {
        ...state,
        userType: action.payload.userType
      };
    case 'clear_user_data':
      return {
        ...state,
        records: [],
        travelRecords: [],
        mobileNumber: '',
        authToken: null,
        userType: UserType.Unknown,
        userProfile: null
      };
    case 'update_user_profile':
      return {
        ...state,
        userProfile: action.payload.userProfile
      };
    default:
      throw new Error();
  }
}
