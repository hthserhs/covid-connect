import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useReducer } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import Verify from './components/Verify';
import { StoreDispatch, StoreState } from './store/context';
import initialState from './store/initial-state';
import { reducer } from './store/reducer';

export type AppNavigatorParamList = {
  Login: undefined;
  Home: undefined;
  Verify: undefined;
};

const Stack = createStackNavigator<AppNavigatorParamList>();

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PaperProvider>
      <StoreDispatch.Provider value={dispatch}>
        <StoreState.Provider value={state}>
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
        </StoreState.Provider>
      </StoreDispatch.Provider>
    </PaperProvider>
  );
}

export default App;
