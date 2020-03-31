import React, { FC } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
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
    color: '#3A4249',
    backgroundColor: '#E5E5E5'
  },
  selected: {
    color: '#FFFFFF',
    backgroundColor: '#00AEEF'
  }
});
