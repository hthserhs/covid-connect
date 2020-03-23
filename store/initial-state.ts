import { getRandomHealthRecords, getRandomTravelRecords } from '../util/mock';
import { State } from './types';

export default {
  records: getRandomHealthRecords(),
  travelRecords: getRandomTravelRecords()
} as State;
