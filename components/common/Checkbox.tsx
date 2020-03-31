import React, { FC } from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { C1, C6 } from '../../constants/colors';
import WrappedText from './WrappedText';

const BORDER_RADIUS = 3;

interface CheckboxItem {
  checked: boolean;
  text: string;
}

interface Props {
  items: CheckboxItem[];
  onToggle: (index: number) => void;
}

const Checkbox: FC<Props> = ({ items, onToggle }) => {
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

        if (item.checked) {
          btnStyle = {
            ...btnStyle,
            backgroundColor: C1
          };
          txtStyle = {
            ...txtStyle,
            color: C6
          };
        }

        return (
          <TouchableOpacity style={btnStyle} onPress={() => onToggle(index)}>
            <WrappedText style={txtStyle}>{item.text}</WrappedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: C1,
    borderWidth: 1,
    borderLeftWidth: 0
  },
  text: {
    color: C1,
    fontWeight: 'bold',
    paddingHorizontal: 18,
    paddingVertical: 6
  }
});
