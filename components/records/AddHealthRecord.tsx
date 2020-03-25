import nanoid from 'nanoid/non-secure';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { getSymptoms } from '../../api/meta';
import { Symptom as SymptomData } from '../../api/types';
import { AppDispatch } from '../../store/context';
import { SeverityLevel } from '../../store/types';
import Button from '../common/Button';
import Symptom from './Symptom';

const AddHealthRecord = () => {
  const [symptoms, setSymptoms] = useState<SymptomData[]>([]);
  const [levels, setLevels] = useState([]);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(AppDispatch);

  const disabled = levels.every(l => l === SeverityLevel.Unspecified);

  const onChangeSeverityLevel = (index: number, level: SeverityLevel) => {
    setLevels([...levels.slice(0, index), level, ...levels.slice(index + 1)]);
  };

  const onAddRecord = () => {
    const recSymptoms = levels.map((level, i) => ({
      name: symptoms[i].name,
      level
    }));

    dispatch({
      type: 'add_record',
      payload: {
        record: {
          id: nanoid(),
          date: Date.now(),
          symptoms: recSymptoms,
          type: 'health'
        }
      }
    });

    setLevels(symptoms.map(_ => SeverityLevel.Unspecified));
    setAlert('Health record added!');
  };

  useEffect(() => {
    getSymptoms().then(resSymptoms => {
      setSymptoms(resSymptoms);
      setLevels(resSymptoms.map(_ => SeverityLevel.Unspecified));
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={symptoms}
        renderItem={({ item, index }) => (
          <Symptom
            name={item.displayName}
            level={levels[index]}
            onChangeSeverityLevel={level => onChangeSeverityLevel(index, level)}
          />
        )}
        keyExtractor={(name, index) => String(index)}
      />
      <Snackbar
        visible={alert}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
      <Button text="Add" onPress={onAddRecord} disabled={disabled} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddHealthRecord;
