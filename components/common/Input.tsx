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
  value: string;
  onChangeValue: (value: string) => void;
  labelKey?: string;
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
      {labelKey ? <Text style={styles.label}>{t(labelKey)}</Text> : null}
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
