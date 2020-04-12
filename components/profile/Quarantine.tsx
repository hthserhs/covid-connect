import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modal, Portal, Switch } from 'react-native-paper';
import { getLocations } from '../../api/locations';
import { Location } from '../../api/types';
import { C9 } from '../../constants/colors';
import DateTime from '../common/DateTime';
import WrappedText from '../common/WrappedText';
import SelectCenter from './SelectCenter';
import { QuarantineFormState } from './types';

interface Props {
  state: QuarantineFormState;
  onChange: (state: QuarantineFormState) => void;
}

const Quarantine: FC<Props> = ({ state, onChange }) => {
  const { home, completed, start, end, locationId } = state;
  const [modal, setModal] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const selectedLocartion = locations.find((l) => l.id === locationId);

  useEffect(() => {
    getLocations().then(setLocations);
  }, []);

  const setFormValue = (key: keyof QuarantineFormState) => (
    value: boolean | Date | number
  ) => {
    onChange({
      ...state,
      [key]: value
    });
  };

  const onChangeLocation = (id: number) => {
    setModal(false);
    setFormValue('locationId')(id);
  };

  return (
    <View>
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Home Quarantine</WrappedText>
        <Switch value={home} onValueChange={setFormValue('home')} />
      </View>
      {!home && (
        <View style={styles.levelField}>
          <WrappedText style={styles.label}>Quarantine Center</WrappedText>
          <TouchableOpacity
            onPress={() => {
              setModal(true);
            }}
          >
            <WrappedText>
              {selectedLocartion ? selectedLocartion.address : 'Select'}
            </WrappedText>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Quarantine completed</WrappedText>
        <Switch value={completed} onValueChange={setFormValue('completed')} />
      </View>
      <View style={styles.levelField}>
        <WrappedText style={styles.label}>Quarantine start date</WrappedText>
        <DateTime value={start} onChange={setFormValue('start')} />
      </View>
      {completed && (
        <View style={styles.levelField}>
          <WrappedText style={styles.label}>Quarantine end date</WrappedText>
          <DateTime value={end} onChange={setFormValue('end')} />
        </View>
      )}
      <Portal>
        <Modal visible={modal} dismissable={false}>
          <SelectCenter
            selectedLocation={locationId}
            locations={locations}
            onCancel={() => setModal(false)}
            onChange={onChangeLocation}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default Quarantine;

const styles = StyleSheet.create({
  levelField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  label: {
    color: C9,
    fontSize: 16
  }
});
