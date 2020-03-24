import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useReducer, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import Verify from './components/Verify';
import { AUTH_TOKEN, IS_NEW_USER } from './storage/keys';
import { readItem, safeJsonParse } from './storage/storage';
import { setAuthToken, setUserType } from './store/actions';
import { AppDispatch, AppState } from './store/context';
import initialState from './store/initial-state';
import { reducer } from './store/reducer';
import { UserType } from './store/types';

const Stack = createStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const { authToken } = state;

  useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken;
      let isNewUser;

      try {
        authToken = await readItem(AUTH_TOKEN);
        isNewUser = await readItem(IS_NEW_USER);
      } catch (e) {
        // @TODO handle error
        setError(true);
        setLoading(false);
      }

      isNewUser = safeJsonParse<boolean>(isNewUser);

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch(setAuthToken(authToken));
      dispatch(setUserType(isNewUser ? UserType.New : UserType.Registered));
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (loading) {
    return <SplashScreen />;
  } else if (error) {
    return <SplashScreen error={true} />;
  }

  return (
    <PaperProvider>
      <AppDispatch.Provider value={dispatch}>
        <AppState.Provider value={state}>
          <NavigationContainer>
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
          </NavigationContainer>
        </AppState.Provider>
      </AppDispatch.Provider>
    </PaperProvider>
  );
}

export default App;
