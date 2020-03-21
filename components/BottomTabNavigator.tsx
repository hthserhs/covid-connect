import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AlertsNavigator from './alerts/AlertsNavigator';
import TabBarIcon from './common/TabBarIcon';
import ProfileNavigator from './profile/ProfileNavigator';
import RecordsNavigator from './records/RecordsNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => {
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
