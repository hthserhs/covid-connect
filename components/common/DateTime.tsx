import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React, { FC, useState } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import WrappedText from './WrappedText';

interface Props {
  value: Date | null;
  mode?: 'date' | 'time';
  onChange: (date: Date) => void;
}

const DateTime: FC<Props> = ({ value, onChange, mode = 'date' }) => {
  const [show, setShow] = useState(false);

  const onChangeDate = (_: Event, selectedDate: Date) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  const displayText =
    mode === 'date'
      ? value instanceof Date
        ? value.toLocaleDateString()
        : 'Select Date'
      : value instanceof Date
      ? value.toLocaleTimeString()
      : 'Select Time';

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShow(true);
        }}
      >
        <WrappedText style={styles.date}>{displayText}</WrappedText>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  date: {}
});
