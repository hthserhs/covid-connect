import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { getRandomRecords } from '../../util/mock';
import RecordTile from './RecordTile';

const FabActions = ({ navigation }) => {
  const [open, setOpen] = useState(false);

  return (
    <FAB.Group
      fabStyle={styles.fab}
      open={open}
      visible={true}
      icon={'plus'}
      color="#fff"
      actions={[
        {
          icon: 'file-plus',
          label: 'Add Health Record',
          onPress: () => navigation.navigate('AddHealthRecord')
        },
        {
          icon: 'train-car',
          label: 'Add Travel Record',
          onPress: () => navigation.navigate('AddTravelRecord')
        }
      ]}
      onStateChange={({ open }) => setOpen(open)}
    />
  );
};

const Records = ({ navigation }) => {
  const data = getRandomRecords();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RecordTile record={item} />}
        keyExtractor={item => item.id}
      />
      <FabActions navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff'
  },
  fab: {
    backgroundColor: 'rgb(0, 174, 239)'
  }
});

export default Records;
