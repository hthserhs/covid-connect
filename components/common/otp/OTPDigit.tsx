import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { C7 } from '../../../constants/colors';

interface Props {
  focus: boolean;
  onBlur: () => void;
  onValue: (val: number) => void;
}

const OTPDigit: FC<Props> = ({ focus, onBlur, onValue }) => {
  const ref = useRef(null);
  const [value, setValue] = useState('');

  const onChangeText = (val: string) => {
    if (Number.isInteger(+val)) {
      setValue(val);
      onValue(val.length === 0 ? -1 : +val);
    }
  };

  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
  }, [focus]);

  return (
    <TextInput
      style={styles.input}
      ref={ref}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      maxLength={1}
    />
  );
};

export default OTPDigit;

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    fontSize: 21,
    backgroundColor: C7,
    height: 48,
    width: '14%'
  }
});
