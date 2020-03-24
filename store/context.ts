import React, { Dispatch } from 'react';
import { Action } from './actions';
import { State } from './types';

export const AppDispatch = React.createContext<Dispatch<Action>>(null);
export const AppState = React.createContext<State>(null);
