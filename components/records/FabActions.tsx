import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { C1, C6 } from '../../constants/colors';

const FabActions = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  return (
    <FAB.Group
      fabStyle={styles.fab}
      open={open}
      visible={true}
      icon={'plus'}
      color={C6}
      actions={[
        {
          icon: 'thermometer',
          label: 'Add Health Record',
          onPress: () => navigation.navigate('AddHealthRecord')
        }
        // {
        //   icon: 'airplane',
        //   label: 'Add Travel History',
        //   onPress: () => navigation.navigate('AddTravelRecord')
        // }
      ]}
      onStateChange={({ open }) => setOpen(open)}
    />
  );
};

export default FabActions;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: C1
  }
});
