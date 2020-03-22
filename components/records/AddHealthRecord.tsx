import nanoid from 'nanoid/non-secure';
import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SYMPTOMS } from '../../constants/app';
import { StoreDispatch } from '../../store/context';
import Button from '../common/Button';
import Symptom from './Symptom';

const AddHealthRecord = () => {
  const [levels, setLevels] = useState(SYMPTOMS.map(_ => -1));
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(StoreDispatch);

  const disabled = levels.every(l => l === -1);

  const onChangeLevel = (index: number, level: number) => {
    setLevels([...levels.slice(0, index), level, ...levels.slice(index + 1)]);
  };

  const onAddRecord = () => {
    const symptoms = levels
      .map((level, i) => ({
        name: SYMPTOMS[i],
        level
      }))
      .filter(s => s.level > -1);
    dispatch({
      type: 'add_record',
      payload: {
        record: {
          id: nanoid(),
          date: Date.now(),
          symptoms,
          type: 'health'
        }
      }
    });
    setLevels(SYMPTOMS.map(_ => -1));
    setAlert('Health record added!');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SYMPTOMS}
        renderItem={({ item, index }) => (
          <Symptom
            name={item}
            level={levels[index]}
            onChangeLevel={level => onChangeLevel(index, level)}
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
