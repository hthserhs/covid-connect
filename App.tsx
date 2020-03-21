import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import Verify from './components/Verify';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
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
    </PaperProvider>
  );
}

export default App;
