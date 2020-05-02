import { color } from 'd3-color';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SeverityLevelItem } from '../records/state/types';
import WrappedText from './WrappedText';

const BORDER_RADIUS = 30;

interface Props {
  levels: SeverityLevelItem[];
  current: number; // -1 if nothing selected
  onChange: (index: number) => void;
  isDisabled: boolean
}

const Severity: FC<Props> = ({ levels, current, onChange, isDisabled }) => {
  let count = 0;
  return (
    <View style={{ flexDirection: 'row' }}>
      {levels.map(({ text, color: c }, index) => {
        const bgColor = color(c);
        bgColor.opacity = index === current ? 1 : 0.1;
        let severityTile = null;
        if(text !== "No"){
          severityTile = 
          <TouchableOpacity
            key={index}
            disabled={isDisabled}
            onPress={() => onChange(current === index ? -1 : index)}
          >
            <View
              style={{
                backgroundColor: bgColor.toString(),
                paddingVertical: 12,
                paddingHorizontal: 30,
                borderTopLeftRadius: index === 1 ? BORDER_RADIUS : 0,
                borderBottomLeftRadius: index === 1 ? BORDER_RADIUS : 0,
                borderTopRightRadius:
                  index === levels.length - 1 ? BORDER_RADIUS : 0,
                borderBottomRightRadius:
                  index === levels.length - 1 ? BORDER_RADIUS : 0
              }}
            >
              <WrappedText>{text}</WrappedText>
            </View>
          </TouchableOpacity>
        }
        return severityTile;
      })}
    </View>
  );
};

export default Severity;

const styles = StyleSheet.create({});
