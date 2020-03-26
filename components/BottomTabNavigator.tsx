import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { IS_USER_PROFILE_COMPLETED } from '../storage/keys';
import { readItem } from '../storage/storage';
import AlertsNavigator from './alerts/AlertsNavigator';
import TabBarIcon from './common/TabBarIcon';
import ProfileNavigator from './profile/ProfileNavigator';
import RecordsNavigator from './records/RecordsNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const navigation = useNavigation();

  navigation.setOptions({
    header: (): null => null
  });

  useEffect(() => {
    readItem(IS_USER_PROFILE_COMPLETED).then(userProfileCompleted => {
      navigation.navigate(userProfileCompleted ? 'Records' : 'Profile');
    });
  }, []);

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
