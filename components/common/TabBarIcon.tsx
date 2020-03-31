import { FontAwesome5 } from '@expo/vector-icons';
import React, { FC } from 'react';
import { C11, C9 } from '../../constants/colors';

interface Props {
  name: string;
  focused: boolean;
}

const TabBarIcon: FC<Props> = props => {
  return (
    <FontAwesome5
      name={props.name}
      size={21}
      color={props.focused ? C11 : C9}
    />
  );
};

export default TabBarIcon;
