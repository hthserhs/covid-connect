import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RadioButton, Snackbar } from 'react-native-paper';
import { t } from '../../util/translation';
import Button from '../common/Button';
import Input from '../common/Input';

const DEFAULT_DATE = new Date('1996-01-01');

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(null);
  const [pincode, setPincode] = useState('');

  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  const disabled = !firstName || !lastName || !gender || !date || !pincode;

  const onSubmit = () => {
    setAlert('Profile saved!');
  };

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={styles.rootContainer}>
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
          <RadioButton.Group onValueChange={setGender} value={gender}>
            <View style={styles.radioGroupItems}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
              <RadioButton.Item label="Other" value="other" />
            </View>
          </RadioButton.Group>
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
