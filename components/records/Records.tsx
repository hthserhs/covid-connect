import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { StoreState } from '../../store/context';
import FabActions from './FabActions';
import { RecordsNavigatorParamList } from './RecordsNavigator';
import RecordTile from './RecordTile';

export type RecordsScreenNavigationProp = StackNavigationProp<
  RecordsNavigatorParamList,
  'RecordList'
>;

interface Props {
  navigation: RecordsScreenNavigationProp;
}

const Records: FC<Props> = ({ navigation }) => {
  const { records } = useContext(StoreState);
  const data = records.sort((a, b) => b.date - a.date);

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
  }
});

export default Records;
