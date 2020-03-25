import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect } from 'react';
import { AppState } from '../store/context';
import AlertsNavigator from './alerts/AlertsNavigator';
import TabBarIcon from './common/TabBarIcon';
import ProfileNavigator from './profile/ProfileNavigator';
import RecordsNavigator from './records/RecordsNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const { userProfileCompleted } = useContext(AppState);

  navigation.setOptions({
    header: (): null => null
  });

  useEffect(() => {
    navigation.navigate(userProfileCompleted ? 'Records' : 'Profile');
  }, [userProfileCompleted]);

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
