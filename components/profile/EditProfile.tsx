import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { t } from '../../util/translation';
import Button from '../common/Button';
import Input from '../common/Input';
import Radio from '../common/Radio';
import { ProfileNavigatorParamList } from './ProfileNavigator';

const DEFAULT_DATE = new Date('1996-01-01');
const GENDER_RADIO_ITEMS = [
  {
    text: 'Male',
    value: 'male'
  },
  {
    text: 'Female',
    value: 'female'
  },
  {
    text: 'Other',
    value: 'other'
  }
];

export type EditProfileScreenNavigationProp = StackNavigationProp<
  ProfileNavigatorParamList,
  'EditProfile'
>;

interface Props {
  navigation: EditProfileScreenNavigationProp;
}

const EditProfile: FC<Props> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState<Date>(null);
  const [pincode, setPincode] = useState('');

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  const disabled = !firstName || !lastName || !gender || !date || !pincode;

  const onSubmit = () => {
    const profile = {
      firstName,
      lastName,
      gender,
      dob: date.getTime(),
      pincode
    };

    console.log(profile);

    setAlert('Profile saved!');
  };

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
          labelKey="firstName"
        />
        <Input
          value={lastName}
          onChangeValue={setLastName}
          labelKey="lastName"
        />
        <View style={styles.field}>
          <Text style={styles.label}>{t('gender')}</Text>
          <View style={{ marginTop: 6 }}>
            <Radio
              items={GENDER_RADIO_ITEMS}
              value={gender}
              onValue={setGender}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>{t('dob')}</Text>
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
            text={t('saveProfile')}
            onPress={onSubmit}
            disabled={disabled}
          />
        </View>
        <TouchableHighlight
          style={{ alignItems: 'center', marginTop: 24 }}
          onPress={() => navigation.navigate('Login')}
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
        visible={alert}
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
  radioGroupItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  date: { fontSize: 18 }
});
