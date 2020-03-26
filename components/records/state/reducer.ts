import { Action } from './actions';
import { State } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update_health_records':
      return {
        ...state,
        healthRecords: action.payload.records
      };
    case 'add_health_record':
      return {
        ...state,
        healthRecords: [...state.healthRecords, action.payload.record]
      };
    case 'add_travel_record':
      return {
        ...state,
        travelRecords: [...state.travelRecords, action.payload.record]
      };
    case 'update_symptoms':
      return {
        ...state,
        symptoms: action.payload.symptoms
      };
    default:
      throw new Error();
  }
}
