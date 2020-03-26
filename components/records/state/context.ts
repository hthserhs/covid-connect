import React, { Dispatch } from 'react';
import { Action } from './actions';
import { State } from './types';

export const RecordsDispatch = React.createContext<Dispatch<Action>>(null);
export const RecordsState = React.createContext<State>(null);
