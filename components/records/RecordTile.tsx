import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { APISymptom } from '../../api/types';
import HealthRecordTile from './HealthRecordTile';
import { HealthRecord, TravelRecord } from './state/types';
import TravelRecordTile from './TravelRecordTile';

interface Props {
  record: HealthRecord | TravelRecord;
  symptoms: APISymptom[];
}

const RecordTile: FC<Props> = ({ record, symptoms }) => {
  const { type } = record;

  return (
    <View style={styles.container}>
      {type === 'health' ? (
        <HealthRecordTile record={record as HealthRecord} symptoms={symptoms} />
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
