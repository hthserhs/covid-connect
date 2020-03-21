import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Alerts from './Alerts';

const Stack = createStackNavigator();

const AlertsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AlertList"
        component={Alerts}
        options={{ title: 'My Alerts' }}
      />
    </Stack.Navigator>
  );
};

export default AlertsNavigator;

const styles = StyleSheet.create({});
