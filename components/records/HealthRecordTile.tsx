import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { APISymptom } from '../../api/types';
import { RECORD_ICONS, RISK_COLORS, SEV_LEVEL_COLORS, SEV_LEVEL_ORDER, SEV_LEVEL_SCORE } from '../../constants/app';
import { C10 } from '../../constants/colors';
import Label from '../common/Label';
import WrappedText from '../common/WrappedText';
import { HealthRecord, RecordSymptom, SeverityLevel, ValueSeverityLevel } from './state/types';

interface Props {
  record: HealthRecord;
  symptoms: APISymptom[];
}

const NON_SEVERITY_LEVELS = [SeverityLevel.Unspecified];

function hasSeverity(
  s: RecordSymptom<SeverityLevel>
): s is RecordSymptom<ValueSeverityLevel> {
  return !NON_SEVERITY_LEVELS.includes(s.level);
}

const HealthRecordTile: FC<Props> = ({ record, symptoms }) => {
  const { date, symptoms: allUserSymptoms } = record;

  const userSymptoms = allUserSymptoms
    .filter<RecordSymptom<ValueSeverityLevel>>(hasSeverity)
    .sort((a, b) =>
      a.level !== b.level
        ? SEV_LEVEL_ORDER.indexOf(b.level) - SEV_LEVEL_ORDER.indexOf(a.level)
        : a.name.localeCompare(b.name)
    );

  let risk = userSymptoms.reduce((acc, s) => acc + SEV_LEVEL_SCORE[s.level], 0);
  risk = Math.min(risk, 3);

  return (
    <View style={styles.itemContainer}>
      <View style={{ marginRight: 12 }}>
        <MaterialCommunityIcons
          name={RECORD_ICONS.health}
          size={36}
          color={RISK_COLORS[risk]}
        />
      </View>
      <View>
        <WrappedText style={styles.date}>
          {new Date(date).toLocaleString()}
        </WrappedText>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {userSymptoms.map(({ name, level }, index) => {
            const symptom = symptoms.find(s => s.name === name);
            const symptomLabel = symptom ? symptom.displayName : 'NA';
            return (
              <View key={index} style={{ marginRight: 6, marginTop: 6 }}>
                <Label
                  text={symptomLabel}
                  current={Math.max(0, SEV_LEVEL_ORDER.indexOf(level))}
                  levels={4}
                  levelColors={SEV_LEVEL_ORDER.map(v => SEV_LEVEL_COLORS[v])}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default HealthRecordTile;

const styles = StyleSheet.create({
  itemContainer: {
    paddingRight: 48,
    paddingLeft: 6,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    color: C10,
    fontSize: 16
  }
});
