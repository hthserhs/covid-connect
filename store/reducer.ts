import { Action } from './actions';
import { State } from './types';

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add_record':
      return {
        ...state,
        records: [...state.records, action.payload.record]
      };
    default:
      throw new Error();
  }
}