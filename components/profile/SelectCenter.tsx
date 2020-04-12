import { FontAwesome5 } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Location } from '../../api/types';
import { C10, C11, C6, C9 } from '../../constants/colors';
import Button from '../common/Button';
import WrappedText from '../common/WrappedText';

const Center: FC<{
  address: string;
  selected: boolean;
  onToggle: () => void;
}> = ({ address, selected, onToggle }) => {
  return (
    <View>
      <TouchableOpacity onPress={onToggle}>
        <View
          style={{
            paddingVertical: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <WrappedText
            style={{
              color: selected ? C11 : C10,
              fontSize: 15,
              fontWeight: selected ? 'bold' : 'normal'
            }}
          >
            {address}
          </WrappedText>
          {selected && <FontAwesome5 name="check" color={C11} />}
        </View>
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  locations: Location[];
  selectedLocation: number;
  onCancel: () => void;
  onChange: (id: number) => void;
}

const SelectCenter: FC<Props> = ({
  onCancel,
  onChange,
  locations,
  selectedLocation
}) => {
  const [selected, setSelected] = useState(selectedLocation);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <WrappedText style={styles.titleText}>Select Center</WrappedText>
        <WrappedText style={styles.titleSubtext}>Tap to select</WrappedText>
      </View>
      <ScrollView>
        {locations.map((l) => (
          <Center
            key={l.id}
            selected={selected === l.id}
            address={l.address}
            onToggle={() => setSelected(selected === l.id ? 0 : l.id)}
          />
        ))}
      </ScrollView>
      <View style={{ marginTop: 12 }}>
        <Button text="Save" onPress={() => onChange(selected)} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button text="Cancel" onPress={onCancel} outline={true} />
      </View>
    </View>
  );
};

export default SelectCenter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: C6,
    padding: 24,
    marginHorizontal: 24
  },
  title: {
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  titleSubtext: {
    fontSize: 12,
    color: C9,
    fontWeight: 'bold'
  }
});
