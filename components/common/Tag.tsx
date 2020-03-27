import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  text: string;
  selected: boolean;
  onToggle: () => void;
}

const Tag: FC<Props> = ({ text, selected, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <Text style={[styles.base, selected ? styles.selected : {}]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    fontWeight: 'bold',
    color: '#3A4249',
    backgroundColor: '#E5E5E5'
  },
  selected: {
    color: '#FFFFFF',
    backgroundColor: '#00AEEF'
  }
});
