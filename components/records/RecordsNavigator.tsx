import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import AddHealthRecord from './AddHealthRecord';
import AddTravelRecord from './AddTravelRecord';
import RecordDetails from './RecordDetails';
import Records from './Records';

const Stack = createStackNavigator();

const RecordsNavigator = () => {
  return (
    <Stack.Navigator>
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
        options={{ title: 'Add Travel Record' }}
      />
      <Stack.Screen
        name="RecordDetails"
        component={RecordDetails}
        options={{ title: 'Record Details' }}
      />
    </Stack.Navigator>
  );
};

export default RecordsNavigator;

const styles = StyleSheet.create({});
