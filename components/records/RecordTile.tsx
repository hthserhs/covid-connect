import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Label from '../common/Label';

const RECORD_ICONS = {
  health: 'thermometer',
  travel: 'airplane'
};

const RECORD_ICON_COLORS = {
  health: 'rgb(0, 174, 239)',
  travel: 'rgb(0, 174, 239)'
};

const LEVEL_COLORS = ['#FFD600', '#FF9900', '#FF0000'];
const RISK_COLORS = ['#00C000', '#1FDD1F', '#FFD600', '#FF9900', '#FF0000'];

export default function RecordTile({ record }) {
  const { date, symptoms, type } = record;
  let risk = symptoms.reduce((acc, s) => acc + s.level, 0);
  risk = Math.min(risk, 5);

  return (
    <View style={styles.itemContainer}>
      <View style={{ marginRight: 12 }}>
        <MaterialCommunityIcons
          name={RECORD_ICONS[type]}
          size={36}
          color={
            type === 'health' ? RISK_COLORS[risk - 1] : RECORD_ICON_COLORS[type]
          }
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text style={styles.date}>{new Date(date).toLocaleString()}</Text>
          {/* <Meter max={5} current={risk} size={12} /> */}
        </View>
        <View style={{ flexDirection: 'row', marginTop: 6 }}>
          {symptoms.map(({ name, level }, index) => (
            <View key={index} style={{ marginRight: 6 }}>
              <Label
                text={name}
                current={level}
                levels={3}
                levelColors={LEVEL_COLORS}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    color: '#979797'
  }
});
