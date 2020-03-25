import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React, { useContext, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { editProfile } from '../../api/user';
import { DEFAULT_DATE, GENDER_RADIO_ITEMS } from '../../constants/app';
import {
  AUTH_TOKEN,
  IS_USER_PROFILE_COMPLETED,
  USER_PROFILE
} from '../../storage/keys';
import { removeItems, saveItem } from '../../storage/storage';
import {
  clearUserData,
  setUserProfileCompleted,
  updateUserProfile
} from '../../store/actions';
import { AppDispatch, AppState } from '../../store/context';
import { text } from '../../util/translation';
import Button from '../common/Button';
import Input from '../common/Input';
import Radio from '../common/Radio';

const EditProfile = () => {
  const { authToken, userProfile } = useContext(AppState);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState<Date>(null);
  const [pincode, setPincode] = useState('');
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(AppDispatch);

  const disabled = !firstName || !lastName || !gender || !date || !pincode;

  useEffect(() => {
    if (userProfile) {
      setFirstName(userProfile.firstName || '');
      setLastName(userProfile.lastName || '');
      setGender(userProfile.gender || '');
      setDate(userProfile.dob > 0 ? new Date(userProfile.dob) : null);
      setPincode(userProfile.pincode > 0 ? String(userProfile.pincode) : '');
    }
  }, [userProfile]);

  const onSubmit = () => {
    const profile = {
      ...userProfile,
      firstName,
      lastName,
      gender,
      dob: date.getTime(),
      pincode: +pincode
    };

    editProfile(authToken, profile)
      .then(async () => {
        await Promise.all([
          saveItem(IS_USER_PROFILE_COMPLETED, true),
          saveItem(USER_PROFILE, profile)
        ]);
        dispatch(updateUserProfile(profile));
        dispatch(setUserProfileCompleted(true));
      })
      .then(() => {
        setAlert('Profile updated!');
      })
      .catch(() => {
        setAlert('Failed to save details!');
      });
  };

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onLogout = () => {
    removeItems([AUTH_TOKEN, IS_USER_PROFILE_COMPLETED, USER_PROFILE]);
    dispatch(clearUserData());
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name="account" size={72} color="#979797" />
      </View>
      <View style={styles.container}>
        <Input
          value={firstName}
          onChangeValue={setFirstName}
          labelKey="first_name"
        />
        <Input
          value={lastName}
          onChangeValue={setLastName}
          labelKey="last_name"
        />
        <View style={styles.field}>
          <Text style={styles.label}>{text('gender')}</Text>
          <View style={{ marginTop: 6 }}>
            <Radio
              items={GENDER_RADIO_ITEMS}
              value={gender}
              onValue={setGender}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>{text('dob')}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setDate(date || DEFAULT_DATE);
              setShow(true);
            }}
          >
            <Text style={styles.date}>
              {date ? date.toLocaleDateString() : ''}
            </Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>
        <Input
          value={pincode}
          onChangeValue={setPincode}
          labelKey="pincode"
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <Button
            text={text('save_profile')}
            onPress={onSubmit}
            disabled={disabled}
          />
        </View>
        <TouchableHighlight
          style={{ alignItems: 'center', marginTop: 24 }}
          onPress={onLogout}
        >
          <Text
            style={{
              color: '#00AEEF'
            }}
          >
            Logout
          </Text>
        </TouchableHighlight>
      </View>
      <Snackbar
        visible={alert !== null}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageContainer: {
    marginTop: 24,
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 24
  },
  field: {
    marginTop: 24
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  label: {
    color: '#979797'
  },
  buttonContainer: {
    marginTop: 30
  },
  date: { fontSize: 18 }
});
