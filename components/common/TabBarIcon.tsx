import { FontAwesome5 } from '@expo/vector-icons';
import React, { FC } from 'react';
import colors from '../../constants/colors';

interface Props {
  name: string;
  focused: boolean;
}

const TabBarIcon: FC<Props> = props => {
  return (
    <FontAwesome5
      name={props.name}
      size={30}
      color={props.focused ? colors.tabIconSelected : colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
