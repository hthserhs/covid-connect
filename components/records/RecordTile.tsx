import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { HealthRecord, TravelRecord } from '../../store/types';
import HealthRecordTile from './HealthRecordTile';
import TravelRecordTile from './TravelRecordTile';

interface Props {
  record: HealthRecord | TravelRecord;
}

const RecordTile: FC<Props> = ({ record }) => {
  const { type } = record;

  return (
    <View style={styles.container}>
      {type === 'health' ? (
        <HealthRecordTile record={record as HealthRecord} />
      ) : (
        <TravelRecordTile record={record as TravelRecord} />
      )}
    </View>
  );
};

export default RecordTile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6
  }
});
