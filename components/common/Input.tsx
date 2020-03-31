import React, { FC } from 'react';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { C8, C9 } from '../../constants/colors';
import { text, TextKey } from '../../util/translation';
import WrappedText from './WrappedText';

interface Props {
  value: string;
  onChangeValue: (value: string) => void;
  labelKey?: TextKey;
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
      {labelKey ? (
        <WrappedText style={styles.label}>{text(labelKey)}</WrappedText>
      ) : null}
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
  field: {},
  input: {
    fontSize: 18,
    borderBottomColor: C8,
    borderBottomWidth: 1,
    paddingBottom: 6
  },
  label: {
    color: C9,
    fontSize: 16
  }
});
