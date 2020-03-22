import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SEV_LEVELS } from '../../constants/app';
import Severity from '../common/Severity';

interface Props {
  name: string;
  level: number;
  onChangeLevel: (level: number) => void;
}

const Symptom: FC<Props> = ({ name, level, onChangeLevel }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 24 }}>
      <Text style={{ fontSize: 21, marginBottom: 12, fontWeight: 'bold' }}>
        {name}
      </Text>
      <Severity
        levels={SEV_LEVELS}
        selected={level}
        onSelected={onChangeLevel}
      />
    </View>
  );
};

export default Symptom;

const styles = StyleSheet.create({});
