import { useFocusEffect } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getProfile } from '../../api/user';
import { C6 } from '../../constants/colors';
import { AUTH_TOKEN, USER_ID } from '../../storage/keys';
import { readItem } from '../../storage/storage';
import { UserProfile } from '../../store/types';
import Activity from '../Activity';
import EditProfile from './EditProfile';

const Profile = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>(null);

  const fetchProfile = React.useCallback(() => {
    setError(false);
    Promise.all([readItem(AUTH_TOKEN), readItem(USER_ID)])
      .then(async ([authToken, userId]) => {
        return getProfile(authToken, userId).then(setUserProfile);
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useFocusEffect(fetchProfile);

  if (loading) {
    return <Activity />;
  } else if (error) {
    return <Activity error={true} />;
  }

  return (
    <View style={styles.container}>
      <EditProfile userProfile={userProfile} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C6
  }
});
