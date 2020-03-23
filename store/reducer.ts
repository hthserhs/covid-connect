import { Action } from './actions';
import { State } from './types';

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_record':
      return {
        ...state,
        records: [...state.records, action.payload.record]
      };
    case 'add_travel_record':
      return {
        ...state,
        travalRecords: [...state.travelRecords, action.payload.record]
      };
    case 'update_mobile_number':
      return {
        ...state,
        mobileNumber: action.payload.mobileNumber
      };
    default:
      throw new Error();
  }
}
