import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { C1 } from '../constants/colors';
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
        <ActivityIndicator size="large" color={C1} />
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
