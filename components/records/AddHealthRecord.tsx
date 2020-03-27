import { useNavigation } from '@react-navigation/core';
import nanoid from 'nanoid/non-secure';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { addUserHealthRecord } from '../../api/user';
import { AUTH_TOKEN, USER_ID } from '../../storage/keys';
import { readItem } from '../../storage/storage';
import Button from '../common/Button';
import { addHealthRecord } from './state/actions';
import { RecordsDispatch, RecordsState } from './state/context';
import { HealthRecord, SeverityLevel } from './state/types';
import Symptom from './Symptom';

const AddHealthRecord = () => {
  const navigation = useNavigation();
  const [levels, setLevels] = useState<SeverityLevel[]>([]);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(RecordsDispatch);
  const { symptoms } = useContext(RecordsState);

  const onChangeSeverityLevel = (index: number, level: SeverityLevel) => {
    setLevels([...levels.slice(0, index), level, ...levels.slice(index + 1)]);
  };

  const onAddRecord = async () => {
    if (levels.every(l => l === SeverityLevel.Unspecified)) {
      setAlert('Select at least one symptom!');
      return;
    }

    const recSymptoms = levels.map((level, i) => ({
      name: symptoms[i].name,
      level
    }));

    const record: HealthRecord = {
      id: nanoid(),
      date: Date.now(),
      symptoms: recSymptoms,
      type: 'health'
    };

    Promise.all([readItem(AUTH_TOKEN), readItem(USER_ID)])
      .then(([authToken, userId]) => {
        return addUserHealthRecord(authToken, userId, record);
      })
      .then(() => {
        dispatch(
          addHealthRecord({
            id: nanoid(),
            date: Date.now(),
            symptoms: recSymptoms,
            type: 'health'
          })
        );

        setLevels(symptoms.map(_ => SeverityLevel.Unspecified));
        navigation.navigate('RecordList');
      });
  };

  useEffect(() => {
    setLevels(symptoms.map(_ => SeverityLevel.Unspecified));
  }, [symptoms]);

  return (
    <View style={styles.container}>
      <FlatList
        data={symptoms}
        renderItem={({ item, index }) => (
          <View
            style={{ marginBottom: index === symptoms.length - 1 ? 24 : 0 }}
          >
            <Symptom
              name={item.displayName}
              level={levels[index]}
              onChangeSeverityLevel={level =>
                onChangeSeverityLevel(index, level)
              }
            />
          </View>
        )}
        keyExtractor={(_, index) => String(index)}
      />
      <Snackbar
        visible={alert}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
      <Button text="Add" onPress={onAddRecord} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default AddHealthRecord;
