import React, { FC, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { RecordsScreenNavigationProp } from './Records';

interface Props {
  navigation: RecordsScreenNavigationProp;
}

const FabActions: FC<Props> = ({ navigation }) => {
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
          icon: 'thermometer',
          label: 'Add Health Record',
          onPress: () => navigation.navigate('AddHealthRecord')
        },
        {
          icon: 'airplane',
          label: 'Add Travel History',
          onPress: () => navigation.navigate('AddTravelRecord')
        }
      ]}
      onStateChange={({ open }) => setOpen(open)}
    />
  );
};

export default FabActions;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'rgb(0, 174, 239)'
  }
});
