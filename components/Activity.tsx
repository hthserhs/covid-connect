import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WrappedText from './common/WrappedText';

interface Props {
  error?: boolean;
}

const Activity: FC<Props> = ({ error }) => {
  return (
    <View style={styles.container}>
      {error ? (
        <WrappedText>An error occured!</WrappedText>
      ) : (
        <ActivityIndicator size="large" color="rgb(0, 174, 239)" />
      )}
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});
