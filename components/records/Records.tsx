import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AppState } from '../../store/context';
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
  const { records, travelRecords } = useContext(AppState);
  const data = [...records, ...travelRecords].sort((a, b) => b.date - a.date);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <RecordTile record={item} />}
        keyExtractor={item => item.id}
      />
      <FabActions navigation={navigation} />
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
