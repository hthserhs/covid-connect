import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: FC<Props> = ({
  text,
  onPress,
  disabled = false,
  outline = false
}) => {
  let btnStyle = styles.button;
  let txtStyle = styles.buttonText;

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
      <Text style={txtStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 174, 239)',
    height: 48,
    borderRadius: 3
  },
  buttonDisabled: {
    backgroundColor: 'rgb(230, 230, 230)',
    borderColor: 'rgb(210, 210, 210)',
    borderWidth: 1
  },
  buttonText: {
    color: 'rgb(255, 255, 255)',
    fontWeight: 'bold',
    fontSize: 18
  },
  buttonTextDisabled: {
    color: 'rgb(190, 190, 190)'
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderColor: 'rgb(0, 174, 239)',
    borderWidth: 1
  },
  buttonOutlineDisabled: {
    backgroundColor: 'rgb(250, 250, 250)',
    borderColor: 'rgb(210, 210, 210)',
    borderWidth: 1
  },
  buttonOutlineText: {
    color: 'rgb(0, 174, 239)'
  }
});
