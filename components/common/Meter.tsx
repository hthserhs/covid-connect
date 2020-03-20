import { interpolateHslLong, quantize } from 'd3-interpolate';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLOR_DEFAULT = '#ddd';

const Meter = ({ max, current, size = 10, vertical = false }) => {
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
            <Text
              style={{
                color: i < current ? colors[i] : COLOR_DEFAULT,
                letterSpacing: 1,
                fontSize: size
              }}
            >
              ⬤
            </Text>
          );
        })}
    </View>
  );
};

export default Meter;

const styles = StyleSheet.create({});
