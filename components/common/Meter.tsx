import { interpolateHslLong, quantize } from 'd3-interpolate';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import WrappedText from './WrappedText';

const COLOR_DEFAULT = '#ddd';

interface Props {
  max: number;
  current: number;
  size?: number;
  vertical?: boolean;
}

const Meter: FC<Props> = ({ max, current, size = 10, vertical = false }) => {
  const colors = quantize(interpolateHslLong('green', 'red'), max);

  if (vertical) {
    colors.reverse();
  }

  return (
    <View
      style={{
        flexDirection: vertical ? 'column' : 'row'
      }}
    >
      {Array(max)
        .fill(null)
        .map((_, i) => {
          return (
            <WrappedText
              key={i}
              style={{
                color: i < current ? colors[i] : COLOR_DEFAULT,
                letterSpacing: 1,
                fontSize: size
              }}
            >
              ⬤
            </WrappedText>
          );
        })}
    </View>
  );
};

export default Meter;

const styles = StyleSheet.create({});
