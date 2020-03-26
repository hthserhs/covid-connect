import { Action } from './actions';
import { State } from './types';

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'update_auth_token':
      return {
        ...state,
        authToken: action.payload.authToken
      };
    default:
      throw new Error();
  }
}
