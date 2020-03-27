import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  title: string;
}

const ProfileSection: FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
