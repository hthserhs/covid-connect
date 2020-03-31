import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import React, { useEffect, useReducer, useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { getProfile } from './api/user';
import Activity from './components/Activity';
import RootNavigator from './components/RootNavigator';
import { AUTH_TOKEN, USER_ID } from './storage/keys';
import { readItem, removeItems } from './storage/storage';
import { updateAuthToken } from './store/actions';
import { AppDispatch } from './store/context';
import initialState from './store/initial-state';
import { reducer } from './store/reducer';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    accent: 'rgb(0, 174, 239)'
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [fontsLoading, setFontsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf')
    }).then(() => {
      setFontsLoading(false);
    });
  }, []);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken: string;

      try {
        authToken = await readItem(AUTH_TOKEN);
        const id = await readItem(USER_ID);
        if (authToken && id) {
          try {
            await getProfile(authToken, id);
          } catch {
            await removeItems([AUTH_TOKEN, USER_ID]);
            authToken = null;
          }
        }
      } catch (e) {
        setError(true);
        setLoading(false);
      }

      dispatch(updateAuthToken(authToken));
      setLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (loading || fontsLoading) {
    return <Activity />;
  } else if (error) {
    return <Activity error={true} />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppDispatch.Provider value={dispatch}>
          <RootNavigator authToken={state.authToken} />
        </AppDispatch.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
