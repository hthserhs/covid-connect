import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SYMPTOMS } from '../../constants/app';
import Button from '../common/Button';
import Severity from '../common/Severity';

const levels = [
  {
    text: 'No',
    color: '#00C000'
  },
  {
    text: 'Low',
    color: '#FFD600'
  },
  {
    text: 'Mild',
    color: '#FF9900'
  },
  {
    text: 'High',
    color: '#FF0000'
  }
];

const Symptom = ({ name }) => {
  const [value, setValue] = useState(-1);

  return (
    <View style={{ alignItems: 'center', marginTop: 24 }}>
      <Text style={{ fontSize: 21, marginBottom: 12, fontWeight: 'bold' }}>
        {name}
      </Text>
      <Severity levels={levels} selected={value} onSelected={setValue} />
    </View>
  );
};

const AddHealthRecord = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={SYMPTOMS}
        renderItem={({ item }) => <Symptom name={item} />}
        keyExtractor={(name, index) => String(index)}
      />
      <Button text="Submit" onPress={console.log} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddHealthRecord;
