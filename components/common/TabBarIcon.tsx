import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import colors from '../../constants/colors';

interface Props {
  name: string;
  focused: boolean;
}

const TabBarIcon: FC<Props> = props => {
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? colors.tabIconSelected : colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
