import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './components/Home';
import Record from './components/Record';
import Verify from './components/Verify';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Record"
          component={Record}
          options={{ title: 'Record Current Symptoms' }}
        />
        <Stack.Screen name="Verify" component={Verify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
