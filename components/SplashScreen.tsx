import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface Props {
  error?: boolean;
}

const SplashScreen: FC<Props> = ({ error }) => {
  return (
    <View style={styles.container}>
      {error ? (
        <Text>An error occured!</Text>
      ) : (
        <ActivityIndicator size="large" color="rgb(0, 174, 239)" />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
