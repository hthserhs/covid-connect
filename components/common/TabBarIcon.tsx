import { FontAwesome5 } from '@expo/vector-icons';
import React, { FC } from 'react';
import { C1, C9 } from '../../constants/colors';

interface Props {
  name: string;
  focused: boolean;
}

const TabBarIcon: FC<Props> = props => {
  return (
    <FontAwesome5 name={props.name} size={30} color={props.focused ? C1 : C9} />
  );
};

export default TabBarIcon;
