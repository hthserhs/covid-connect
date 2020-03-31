import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import WrappedText from '../common/WrappedText';

interface Props {
  title: string;
}

const ProfileSection: FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <WrappedText style={styles.title}>{title}</WrappedText>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default ProfileSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  title: {
    marginTop: 12,
    fontSize: 21,
    fontWeight: 'bold'
  },
  content: {
    marginTop: 6
  }
});
