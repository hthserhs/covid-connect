import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getRandomRecords } from '../../util/mock';
import Label from '../common/Label';
import Meter from '../common/Meter';

function Item({ record }) {
  const { date, symptoms } = record;
  let risk = symptoms.reduce((acc, s) => acc + s.level, 0);
  risk = Math.min(risk, 5);

  return (
    <View style={styles.itemContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Meter max={5} current={risk} size={12} />
        <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>
        {symptoms.map(({ name, level }) => (
          <View style={{ marginRight: 6 }}>
            <Label text={name} current={level} levels={3} />
          </View>
        ))}
      </View>
    </View>
  );
}

const Records = () => {
  const data = getRandomRecords();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item record={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff'
  },
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  date: {
    color: '#979797'
  }
});

export default Records;
