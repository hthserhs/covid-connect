import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { t } from '../../util/translation';
import Button from '../common/Button';
import Input from '../common/Input';
import Radio from '../common/Radio';

const travelModes = ['Flight', 'Train', 'Bus', 'Other'];
const labelsFromLocation = [
  'fromAirport',
  'fromStation',
  'fromLocation',
  'fromLocation'
];
const labelsToLocation = ['toAirport', 'toStation', 'toLocation', 'toLocation'];
const labelsTransportId = [
  'flightNumber',
  'trainNumber',
  'busNumber',
  'transportId'
];

const AddTravelRecord = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [transportId, setTransportId] = useState('');
  const [selectedMode, setSelectedMode] = useState(0);
  const [alert, setAlert] = useState(null);

  const disabled = !date || !fromLocation || !toLocation || !transportId;

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onToggleMode = (index: number) => {
    setSelectedMode(selectedMode === index ? -1 : index);
  };

  const onAddRecord = () => {
    setDate(new Date());
    setFromLocation('');
    setToLocation('');
    setTransportId('');
    setSelectedMode(0);
    setAlert('Travel history added!');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignSelf: 'center', marginTop: 24 }}>
          <Radio
            items={travelModes}
            selected={selectedMode}
            onToggle={onToggleMode}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>{t('date')}</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              setDate(date);
              setShow(true);
            }}
          >
            <Text style={styles.date}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker value={date} mode="date" onChange={onChange} />
          )}
        </View>
        <Input
          value={fromLocation}
          onChangeValue={setFromLocation}
          labelKey={labelsFromLocation[selectedMode]}
        />
        <Input
          value={toLocation}
          onChangeValue={setToLocation}
          labelKey={labelsToLocation[selectedMode]}
        />
        <Input
          value={transportId}
          onChangeValue={setTransportId}
          labelKey={labelsTransportId[selectedMode]}
        />
      </ScrollView>
      <Snackbar
        visible={alert}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
      <Button text="Add" onPress={onAddRecord} disabled={disabled} />
    </View>
  );
};

export default AddTravelRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollView: {
    paddingHorizontal: 12
  },
  field: {
    marginTop: 24
  },
  label: {
    color: '#979797'
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  date: { fontSize: 18 }
});
