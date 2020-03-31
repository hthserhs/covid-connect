import React, { FC } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { C1, C10, C6, C8 } from '../../constants/colors';
import WrappedText from './WrappedText';

interface Props {
  text: string;
  selected: boolean;
  onToggle: () => void;
}

const Tag: FC<Props> = ({ text, selected, onToggle }) => {
  let textStyle: TextStyle = styles.base;

  if (selected) {
    textStyle = { ...textStyle, ...styles.selected };
  }

  return (
    <TouchableOpacity onPress={onToggle}>
      <WrappedText style={textStyle}>{text}</WrappedText>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    color: C10,
    backgroundColor: C8
  },
  selected: {
    color: C6,
    backgroundColor: C1
  }
});
