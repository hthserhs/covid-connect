import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { C6 } from '../../constants/colors';
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
        renderItem={({ item, index }) => (
          <View style={{ marginBottom: index === data.length - 1 ? 24 : 0 }}>
            <RecordTile record={item} symptoms={symptoms} />
          </View>
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
    backgroundColor: C6
  }
});

export default Records;
