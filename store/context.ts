import React, { Dispatch } from 'react';
import { Action } from './actions';
import { State } from './types';

export const StoreDispatch = React.createContext<Dispatch<Action>>(null);
export const StoreState = React.createContext<State>(null);
