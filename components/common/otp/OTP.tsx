import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import OTPDigit from './OTPDigit';

const initialOTPState = [true, false, false, false, false, false].map(
  focus => ({
    focus,
    value: -1
  })
);

interface Props {
  onOtp: (otp: number[]) => void;
}

const OTP: FC<Props> = ({ onOtp }) => {
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

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 76,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default OTP;
