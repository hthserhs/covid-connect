import React, { useState } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';

const Symptom = ({ name }) => {
  const [value, setValue] = useState(false);

  return (
    <View style={styles.symptom}>
      <Text style={{ fontSize: 18 }}>{name}</Text>
      <Switch value={value} onValueChange={setValue}></Switch>
    </View>
  );
};

const Record = () => {
  return (
    <View style={styles.container}>
      <Symptom name="Fever" />
      <Symptom name="Dry cough" />
      <Symptom name="Cold" />
      <Symptom name="Tiredness" />
      <Symptom name="Difficulty in breathing" />
      <Symptom name="Pain in joints" />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={console.log}></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  symptom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  buttonContainer: {
    minWidth: 180,
    marginTop: 24
  }
});

export default Record;
