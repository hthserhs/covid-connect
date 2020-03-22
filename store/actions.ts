import { Record } from './types';

export interface AddRecordAction {
  type: 'add_record';
  payload: {
    record: Record;
  };
}

export type Action = AddRecordAction;
