import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { AppNavigatorParamList } from '../App';
import AlertsNavigator from './alerts/AlertsNavigator';
import TabBarIcon from './common/TabBarIcon';
import ProfileNavigator from './profile/ProfileNavigator';
import RecordsNavigator from './records/RecordsNavigator';

export type BottomTabNavigatorParamList = {
  Records: undefined;
  Alerts: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<
  BottomTabNavigatorParamList
>();

type BottomTabScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamList,
  'Home'
>;

interface Props {
  navigation: BottomTabScreenNavigationProp;
}

const BottomTabNavigator: FC<Props> = ({ navigation }) => {
  navigation.setOptions({
    header: () => null
  });

  return (
    <Navigator
      tabBarOptions={{
        showLabel: false
      }}
    >
      <Screen
        name="Records"
        component={RecordsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-folder" />
          )
        }}
      />
      <Screen
        name="Alerts"
        component={AlertsNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-alert" />
          )
        }}
      />
      <Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          )
        }}
      />
    </Navigator>
  );
};

export default BottomTabNavigator;
