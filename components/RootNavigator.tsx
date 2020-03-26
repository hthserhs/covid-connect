import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import Login from './Login';
import Verify from './Verify';

export type RootStackParamList = {
  Login: undefined;
  Verify: { mobileNumber: string };
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

interface Props {
  authToken: string;
}

const RootNavigator: FC<Props> = ({ authToken }) => {
  return (
    <Stack.Navigator>
      {authToken === null ? (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{ title: '' }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ title: '' }}
        />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
