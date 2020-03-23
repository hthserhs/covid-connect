import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import React, { useContext, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import {
  LABELS_TRANSPORT_FROM,
  LABELS_TRANSPORT_ID,
  LABELS_TRANSPORT_TO,
  TRANSPORT_MODE_RADIO_ITEMS
} from '../../constants/app';
import { addTravelRecord } from '../../store/actions';
import { StoreDispatch } from '../../store/context';
import { TransportMode } from '../../store/types';
import { t } from '../../util/translation';
import Button from '../common/Button';
import Input from '../common/Input';
import Radio from '../common/Radio';

const AddTravelRecord = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [transportId, setTransportId] = useState('');
  const [transportMode, setTransportMode] = useState(TransportMode.Flight);
  const [alert, setAlert] = useState(null);
  const dispatch = useContext(StoreDispatch);

  const disabled = !date || !fromLocation || !toLocation || !transportId;

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onAddRecord = () => {
    setDate(new Date());
    setFromLocation('');
    setToLocation('');
    setTransportId('');
    setTransportMode(TransportMode.Flight);

    dispatch(
      addTravelRecord(
        Date.now(),
        fromLocation,
        toLocation,
        transportMode,
        transportId
      )
    );

    setAlert('Travel history added!');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ alignSelf: 'center', marginTop: 24 }}>
          <Radio
            items={TRANSPORT_MODE_RADIO_ITEMS}
            value={transportMode}
            onValue={setTransportMode}
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
          labelKey={LABELS_TRANSPORT_FROM[transportMode]}
        />
        <Input
          value={toLocation}
          onChangeValue={setToLocation}
          labelKey={LABELS_TRANSPORT_TO[transportMode]}
        />
        <Input
          value={transportId}
          onChangeValue={setTransportId}
          labelKey={LABELS_TRANSPORT_ID[transportMode]}
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
