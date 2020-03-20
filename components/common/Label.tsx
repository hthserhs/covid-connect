import { color } from 'd3-color';
import { interpolateHslLong, quantize } from 'd3-interpolate';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Label = ({ text, levels = 10, current, range = ['yellow', 'red'] }) => {
  const [from, to] = range;
  const colors = quantize(interpolateHslLong(from, to), levels);

  const backgroundColor = color(colors[current - 1]);
  backgroundColor.opacity = 0.2;

  const borderColor = color(colors[current - 1]);
  borderColor.opacity = 0.5;

  const style = {
    ...styles.base,
    borderColor: borderColor.toString(),
    backgroundColor: backgroundColor.toString()
  };

  return <Text style={style}>{text}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  base: {
    // borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 1.5
  }
});
//
