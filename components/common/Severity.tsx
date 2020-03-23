import { color } from 'd3-color';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SeverityLevelItem } from '../../store/types';

const BORDER_RADIUS = 30;

interface Props {
  levels: SeverityLevelItem[];
  current: number; // -1 if nothing selected
  onChange: (index: number) => void;
}

const Severity: FC<Props> = ({ levels, current, onChange }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {levels.map(({ text, color: c }, index) => {
        const bgColor = color(c);
        bgColor.opacity = index === current ? 1 : 0.1;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onChange(current === index ? -1 : index)}
          >
            <View
              style={{
                backgroundColor: bgColor.toString(),
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderTopLeftRadius: index === 0 ? BORDER_RADIUS : 0,
                borderBottomLeftRadius: index === 0 ? BORDER_RADIUS : 0,
                borderTopRightRadius:
                  index === levels.length - 1 ? BORDER_RADIUS : 0,
                borderBottomRightRadius:
                  index === levels.length - 1 ? BORDER_RADIUS : 0
              }}
            >
              <Text>{text}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Severity;

const styles = StyleSheet.create({});
