import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Alerts = () => {
  return (
    <View style={styles.container}>
      <Text>You don't have any alerts!</Text>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
