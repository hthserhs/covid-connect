import React, { FC } from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';

const BORDER_RADIUS = 3;

interface Props {
  items: string[];
  selected: number;
  onToggle: (index: number) => void;
}

const Radio: FC<Props> = ({ items, onToggle, selected }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {items.map((item, index) => {
        let btnStyle: ViewStyle = styles.button;
        let txtStyle: TextStyle = styles.text;

        if (index === 0) {
          btnStyle = {
            ...btnStyle,
            borderTopLeftRadius: BORDER_RADIUS,
            borderBottomLeftRadius: BORDER_RADIUS,
            borderLeftWidth: 1
          };
        }

        if (index === items.length - 1) {
          btnStyle = {
            ...btnStyle,
            borderTopRightRadius: BORDER_RADIUS,
            borderBottomRightRadius: BORDER_RADIUS
          };
        }

        if (index === selected) {
          btnStyle = {
            ...btnStyle,
            backgroundColor: 'rgb(0, 174, 239)'
          };
          txtStyle = {
            ...txtStyle,
            color: 'rgb(255, 255, 255)'
          };
        }

        return (
          <TouchableOpacity style={btnStyle} onPress={() => onToggle(index)}>
            <Text style={txtStyle}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(0, 174, 239)',
    borderWidth: 1,
    borderLeftWidth: 0
  },
  text: {
    color: 'rgb(0, 174, 239)',
    fontWeight: 'bold',
    paddingHorizontal: 18,
    paddingVertical: 6
  }
});
