import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { C1, C6 } from '../../constants/colors';
import Profile from './Profile';

export type ProfileNavigatorParamList = {
  EditProfile: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: C1
        },
        headerTintColor: C6
      }}
    >
      <Stack.Screen
        name="EditProfile"
        component={Profile}
        options={{ title: 'My Profile' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
