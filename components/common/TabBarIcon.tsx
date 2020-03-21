import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import colors from '../../constants/colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.tabIconSelected : colors.tabIconDefault}
    />
  );
}
