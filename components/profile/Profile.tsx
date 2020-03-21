import React from 'react';
import { StyleSheet, View } from 'react-native';
import EditProfile from './EditProfile';

const Profile = () => {
  return (
    <View style={styles.container}>
      <EditProfile />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
