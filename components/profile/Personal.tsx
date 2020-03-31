import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React, { FC, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DEFAULT_DATE, GENDER_RADIO_ITEMS } from '../../constants/app';
import { C8, C9 } from '../../constants/colors';
import { text } from '../../util/translation';
import Input from '../common/Input';
import Radio from '../common/Radio';
import WrappedText from '../common/WrappedText';
import { PersonalFormState } from './types';

interface Props {
  values: PersonalFormState;
  onChangeValues: (values: PersonalFormState) => void;
}

const Personal: FC<Props> = props => {
  const { values, onChangeValues } = props;
  const { firstName, lastName, gender, dob, pincode } = values;
  const [showPicker, setShowPicker] = useState(false);

  const onChangeFormValue = (name: string) => (value: string | Date | null) => {
    onChangeValues({
      ...values,
      [name]: value
    });
  };

  const onChangeFirstName = onChangeFormValue('firstName');
  const onChangeLastName = onChangeFormValue('lastName');
  const onChangeGender = onChangeFormValue('gender');
  const onChangeDob = onChangeFormValue('dob');
  const onChangePincode = onChangeFormValue('pincode');

  const onDateChange = (_: Event, selectedDate: Date) => {
    const currentDate = selectedDate || dob;
    setShowPicker(Platform.OS === 'ios');
    onChangeDob(currentDate);
  };

  return (
    <View>
      <View style={styles.field}>
        <Input
          value={firstName}
          onChangeValue={onChangeFirstName}
          labelKey="first_name"
        />
      </View>
      <View style={styles.field}>
        <Input
          value={lastName}
          onChangeValue={onChangeLastName}
          labelKey="last_name"
        />
      </View>
      <View style={styles.field}>
        <WrappedText style={styles.label}>{text('gender')}</WrappedText>
        <View style={{ marginTop: 6 }}>
          <Radio
            items={GENDER_RADIO_ITEMS}
            value={gender}
            onValue={onChangeGender}
          />
        </View>
      </View>
      <View style={styles.field}>
        <WrappedText style={styles.label}>{text('dob')}</WrappedText>
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            onChangeDob(dob || DEFAULT_DATE);
            setShowPicker(true);
          }}
        >
          <WrappedText style={styles.date}>
            {dob ? dob.toLocaleDateString() : ''}
          </WrappedText>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="spinner"
            onChange={onDateChange}
          />
        )}
      </View>
      <Input
        value={pincode}
        onChangeValue={onChangePincode}
        labelKey="pincode"
        keyboardType="numeric"
      />
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({
  field: {
    marginBottom: 24
  },
  input: {
    fontSize: 18,
    borderBottomColor: C8,
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  label: {
    color: C9,
    fontSize: 16
  },
  date: { fontSize: 18 }
});
