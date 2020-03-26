import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FabActions from './FabActions';
import RecordTile from './RecordTile';
import { RecordsState } from './state/context';

const Records = () => {
  const { healthRecords, travelRecords, symptoms } = useContext(RecordsState);
  const data = [...healthRecords, ...travelRecords].sort(
    (a, b) => b.date - a.date
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <RecordTile record={item} symptoms={symptoms} />
        )}
        keyExtractor={item => item.id}
      />
      <FabActions />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

export default Records;
