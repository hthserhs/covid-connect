import React from 'react';
import { StyleSheet, View } from 'react-native';
import { C6 } from '../../constants/colors';
import WrappedText from '../common/WrappedText';

const Alerts = () => {
  return (
    <View style={styles.container}>
      <WrappedText>You don't have any alerts!</WrappedText>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: C6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
