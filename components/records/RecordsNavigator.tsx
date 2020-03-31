import { useFocusEffect } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useReducer } from 'react';
import { getSymptoms } from '../../api/meta';
import { getUserHealthRecords } from '../../api/user';
import { C1, C6 } from '../../constants/colors';
import { AUTH_TOKEN, USER_ID } from '../../storage/keys';
import { readItem } from '../../storage/storage';
import AddHealthRecord from './AddHealthRecord';
import AddTravelRecord from './AddTravelRecord';
import RecordDetails from './RecordDetails';
import Records from './Records';
import { updateHealthRecords, updateSymptoms } from './state/actions';
import { RecordsDispatch, RecordsState } from './state/context';
import initialState from './state/initial-state';
import { reducer } from './state/reducer';

const Stack = createStackNavigator();

const RecordsNavigatorRoot = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRecords = React.useCallback(() => {
    Promise.all([readItem(AUTH_TOKEN), readItem(USER_ID)]).then(
      ([authToken, userId]) => {
        Promise.all([
          getUserHealthRecords(authToken, userId),
          getSymptoms()
        ]).then(([records, symptoms]) => {
          dispatch(updateHealthRecords(records));
          dispatch(updateSymptoms(symptoms));
        });
      }
    );
  }, []);

  useFocusEffect(fetchRecords);

  return (
    <RecordsDispatch.Provider value={dispatch}>
      <RecordsState.Provider value={state}>
        <RecordsNavigator />
      </RecordsState.Provider>
    </RecordsDispatch.Provider>
  );
};

const RecordsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: C1
        },
        headerTintColor: C6
      }}
    >
      <Stack.Screen
        name="RecordList"
        component={Records}
        options={{ title: 'My Records' }}
      />
      <Stack.Screen
        name="AddHealthRecord"
        component={AddHealthRecord}
        options={{ title: 'Add Health Record' }}
      />
      <Stack.Screen
        name="AddTravelRecord"
        component={AddTravelRecord}
        options={{ title: 'Add Travel History' }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetails}
        options={{ title: 'Record Details' }}
      />
    </Stack.Navigator>
  );
};

export default RecordsNavigatorRoot;
