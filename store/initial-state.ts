import { getRandomHealthRecords, getRandomTravelRecords } from '../util/mock';
import { State, UserType } from './types';

export default {
  records: getRandomHealthRecords(),
  travelRecords: getRandomTravelRecords(),
  mobileNumber: '',
  authToken: null,
  userType: UserType.Unknown,
  userProfile: null
} as State;
