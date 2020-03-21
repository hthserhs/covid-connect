import { color } from 'd3-color';
import { interpolateHslLong, quantize } from 'd3-interpolate';
import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
  current: number;
  levels?: number;
  levelColors?: string[];
}

const Label: FC<Props> = ({ text, levels = 10, current, levelColors }) => {
  const colors =
    levelColors || quantize(interpolateHslLong('yellow', 'red'), levels);

  const backgroundColor = color(colors[current - 1]);
  backgroundColor.opacity = 0.1;

  const borderColor = color(colors[current - 1]);

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
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 1.5,
    fontWeight: 'bold'
  }
});
