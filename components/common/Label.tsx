import { color } from 'd3-color';
import { interpolateHslLong, quantize } from 'd3-interpolate';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { C10 } from '../../constants/colors';
import WrappedText from './WrappedText';

interface Props {
  text: string;
  current: number;
  levels?: number;
  levelColors?: string[];
}

const Label: FC<Props> = ({ text, levels = 10, current, levelColors }) => {
  const colors =
    levelColors || quantize(interpolateHslLong('yellow', 'red'), levels);

  const backgroundColor = color(colors[current]);
  backgroundColor.opacity = 0.1;

  const borderColor = color(colors[current]);

  const style = {
    ...styles.base,
    borderColor: borderColor.toString(),
    backgroundColor: backgroundColor.toString()
  };

  return <WrappedText style={style}>{text}</WrappedText>;
};

export default Label;

const styles = StyleSheet.create({
  base: {
    borderWidth: 1.2,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    fontWeight: 'bold',
    color: C10
  }
});
