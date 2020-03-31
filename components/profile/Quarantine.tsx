import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch } from 'react-native-paper';
import DateTime from '../common/DateTime';
import WrappedText from '../common/WrappedText';
import { QuarantineFormState } from './types';

interface Props {
  state: QuarantineFormState;
  onChange: (state: QuarantineFormState) => void;
}

const Quarantine: FC<Props> = ({ state, onChange }) => {
  const { home, completed, start, end } = state;

  const setFormValue = (key: keyof QuarantineFormState) => (
    value: boolean | Date
  ) => {
    onChange({
      ...state,
      [key]: value
    });
  };

  return (
    <View>
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Home Quarantine</WrappedText>
        <Switch value={home} onValueChange={setFormValue('home')} />
      </View>
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Quarantine completed</WrappedText>
        <Switch value={completed} onValueChange={setFormValue('completed')} />
      </View>
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Quarantine start date</WrappedText>
        <DateTime value={start} onChange={setFormValue('start')} />
      </View>
      {completed && (
        <View style={styles.levelField}>
          <WrappedText style={styles.label}>Quarantine end date</WrappedText>
          <DateTime value={end} onChange={setFormValue('end')} />
        </View>
      )}
    </View>
  );
};

export default Quarantine;

const styles = StyleSheet.create({
  levelField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  label: {
    color: '#979797',
    fontSize: 16
  }
});
