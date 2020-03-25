import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useReducer, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BottomTabNavigator from './components/BottomTabNavigator';
import Login from './components/Login';
import SplashScreen from './components/SplashScreen';
import Verify from './components/Verify';
import {
  AUTH_TOKEN,
  IS_USER_PROFILE_COMPLETED,
  USER_PROFILE
} from './storage/keys';
import { log, readItem, safeJsonParse } from './storage/storage';
import {
  setAuthToken,
  setUserProfileCompleted,
  updateUserProfile
} from './store/actions';
import { AppDispatch, AppState } from './store/context';
import initialState from './store/initial-state';
import { reducer } from './store/reducer';
import { UserProfile } from './store/types';

export type RootStackParamList = {
  Login: undefined;
  Verify: { mobileNumber: string };
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  log();
  console.log(state);
  const { authToken } = state;

  useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken: string;
      let isUserProfileCompleted;
      let userProfile;

      try {
        authToken = await readItem(AUTH_TOKEN);
        isUserProfileCompleted = await readItem(IS_USER_PROFILE_COMPLETED);
        userProfile = await readItem(USER_PROFILE);
      } catch (e) {
        setError(true);
        setLoading(false);
      }

      isUserProfileCompleted = safeJsonParse<boolean>(isUserProfileCompleted);
      userProfile = safeJsonParse<UserProfile>(userProfile);

      dispatch(updateUserProfile(userProfile));
      dispatch(setAuthToken(authToken));
      dispatch(setUserProfileCompleted(isUserProfileCompleted === true));
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
