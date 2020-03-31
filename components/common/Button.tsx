import React, { FC } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { C1, C6, C7, C8, C9 } from '../../constants/colors';
import WrappedText from './WrappedText';

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  outline?: boolean;
  customBtnStyle?: ViewStyle;
  customTxtStyle?: TextStyle;
}

const Button: FC<Props> = ({
  text,
  onPress,
  disabled = false,
  outline = false,
  customBtnStyle,
  customTxtStyle
}) => {
  let btnStyle = { ...styles.button, ...customBtnStyle };
  let txtStyle = { ...styles.buttonText, ...customTxtStyle };

  if (outline) {
    btnStyle = { ...btnStyle, ...styles.buttonOutline };
    txtStyle = { ...txtStyle, ...styles.buttonOutlineText };
  }

  if (disabled) {
    btnStyle = {
      ...btnStyle,
      ...(outline ? styles.buttonOutlineDisabled : styles.buttonDisabled)
    };
    txtStyle = { ...txtStyle, ...styles.buttonTextDisabled };
  }

  return (
    <TouchableOpacity style={btnStyle} onPress={onPress} disabled={disabled}>
      <WrappedText style={txtStyle}>{text}</WrappedText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: C1,
    height: 48
  },
  buttonDisabled: {
    backgroundColor: C7,
    borderColor: C8,
    borderWidth: 1
  },
  buttonText: {
    color: C6,
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonTextDisabled: {
    color: C9
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: C1,
    borderWidth: 1
  },
  buttonOutlineDisabled: {
    backgroundColor: C7,
    borderColor: C8,
    borderWidth: 1
  },
  buttonOutlineText: {
    color: C1
  }
});
