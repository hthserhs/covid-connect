import React, { FC } from 'react';
import { HealthRecord, TravelRecord } from '../../store/types';
import HealthRecordTile from './HealthRecordTile';
import TravelRecordTile from './TravelRecordTile';

interface Props {
  record: HealthRecord | TravelRecord;
}

const RecordTile: FC<Props> = ({ record }) => {
  const { type } = record;

  return type === 'health' ? (
    <HealthRecordTile record={record as HealthRecord} />
  ) : (
    <TravelRecordTile record={record as TravelRecord} />
  );
};

export default RecordTile;
