import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  SEV_LEVEL_COLORS,
  SEV_LEVEL_ORDER,
  SEV_LEVEL_TEXTS
} from '../../constants/app';
import { SeverityLevel, SeverityLevelItem } from '../../store/types';
import Severity from '../common/Severity';

interface Props {
  name: string;
  level: SeverityLevel;
  onChangeSeverityLevel: (level: SeverityLevel) => void;
}

const Symptom: FC<Props> = ({
  name,
  level,
  onChangeSeverityLevel: onChangeSeverityLevel
}) => {
  const levels = SEV_LEVEL_ORDER.map<SeverityLevelItem>(l => ({
    text: SEV_LEVEL_TEXTS[l],
    color: SEV_LEVEL_COLORS[l]
  }));

  const current =
    level === SeverityLevel.Unspecified ? -1 : SEV_LEVEL_ORDER.indexOf(level);

  const onChangeLevel = (index: number) => {
    onChangeSeverityLevel(
      index === -1 ? SeverityLevel.Unspecified : SEV_LEVEL_ORDER[index]
    );
  };

  return (
    <View style={{ alignItems: 'center', marginTop: 24 }}>
      <Text style={{ fontSize: 21, marginBottom: 12, fontWeight: 'bold' }}>
        {name}
      </Text>
      <Severity levels={levels} current={current} onChange={onChangeLevel} />
    </View>
  );
};

export default Symptom;

const styles = StyleSheet.create({});
