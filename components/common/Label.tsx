import { color } from 'd3-color';
import { interpolateHslLong, quantize } from 'd3-interpolate';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { C10, C5, C7 } from '../../constants/colors';
import WrappedText from './WrappedText';

interface Props {
  text: string;
  current: number;
  levels?: number;
  levelColors?: string[];
}

const Label: FC<Props> = ({ text, levels = 10, current, levelColors }) => {
  const colors = levelColors || quantize(interpolateHslLong(C5, C7), levels);

  const backgroundColor = color(colors[current]);
  backgroundColor.opacity = 0.1;

  const borderColor = color(colors[current]);

  const style = {
    ...styles.base,
    borderColor: borderColor.toString(),
    borderWidth: 1.5,
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
