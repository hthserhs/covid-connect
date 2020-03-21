import React, { FC } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { t } from '../../util/translation';

interface Props {
  labelKey: string;
  value: string;
  onChangeValue: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

const Input: FC<Props> = ({
  labelKey,
  value,
  onChangeValue,
  keyboardType = 'default'
}) => {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{t(labelKey)}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeValue}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
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
  }
});
