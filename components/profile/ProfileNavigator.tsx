import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import EditProfile from './EditProfile';

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
        component={EditProfile}
        options={{ title: 'My Profile' }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({});
