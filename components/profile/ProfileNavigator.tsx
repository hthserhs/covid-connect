import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Profile from './Profile';

export type ProfileNavigatorParamList = {
  EditProfile: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
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
