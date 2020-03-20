import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import Verify from './components/Verify';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
