import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const initialOTPState = [true, false, false, false].map(focus => ({
  focus,
  value: -1
}));

const OTP = ({ onOtp }) => {
  const [state, setState] = useState(initialOTPState);

  return (
    <View style={styles.inputContainer}>
      {state.map(({ focus }, index) => {
        const onBlur = () => {
          let nextState = [
            ...state.slice(0, index),
            {
              ...state[index],
              focus: false
            },
            ...state.slice(index + 1)
          ];

          setState(nextState);
        };

        const onValue = (value: number) => {
          let nextState = [
            ...state.slice(0, index),
            {
              ...state[index],
              value
            },
            ...state.slice(index + 1)
          ];

          if (value !== -1 && index < state.length - 1) {
            nextState[index + 1].focus = true;
          }

          const otp = nextState.map(({ value }) => value).filter(v => v > -1);
          onOtp(otp);

          setState(nextState);
        };

        return (
          <OTPDigit
            key={index}
            focus={focus}
            onBlur={onBlur}
            onValue={onValue}
          />
        );
      })}
    </View>
  );
};

const OTPDigit = ({ focus, onBlur, onValue }) => {
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

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 76,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    textAlign: 'center',
    fontSize: 21,
    backgroundColor: '#ebebeb',
    height: 48,
    width: '22%'
  }
});

export default OTP;
