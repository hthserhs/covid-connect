import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  style?: TextStyle;
}

const WrappedText: FC<Props> = ({ style, children }) => {
  const fontFamily =
    style && style.fontWeight === 'bold'
      ? 'open-sans-bold'
      : 'open-sans-regular';

  return (
    <Text
      style={{
        ...style,
        fontFamily
      }}
    >
      {children}
    </Text>
  );
};

export default WrappedText;

const styles = StyleSheet.create({});
