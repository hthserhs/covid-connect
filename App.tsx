import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useReducer, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigator from './components/RootNavigator';
import SplashScreen from './components/SplashScreen';
import { AUTH_TOKEN } from './storage/keys';
import { readItem } from './storage/storage';
import { updateAuthToken } from './store/actions';
import { AppDispatch } from './store/context';
import initialState from './store/initial-state';
import { reducer } from './store/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let authToken: string;

      try {
        authToken = await readItem(AUTH_TOKEN);
      } catch (e) {
        setError(true);
        setLoading(false);
      }

      dispatch(updateAuthToken(authToken));
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
      <NavigationContainer>
        <AppDispatch.Provider value={dispatch}>
          <RootNavigator authToken={state.authToken} />
        </AppDispatch.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
