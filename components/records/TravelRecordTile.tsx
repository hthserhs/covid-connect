import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { RECORD_ICON_COLORS, TRANSPORT_MODE_ICONS } from '../../constants/app';
import WrappedText from '../common/WrappedText';
import { TravelRecord } from './state/types';

interface Props {
  record: TravelRecord;
}

const TravelRecordTile: FC<Props> = ({ record }) => {
  const { date, from, to, transportId, transportMode } = record;

  return (
    <View style={styles.itemContainer}>
      <View style={{ marginRight: 12 }}>
        <MaterialCommunityIcons
          name={TRANSPORT_MODE_ICONS[transportMode]}
          size={36}
          color={RECORD_ICON_COLORS.travel}
        />
      </View>
      <View style={{ flex: 1 }}>
        <WrappedText style={styles.date}>
          {new Date(date).toLocaleString()}
        </WrappedText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <WrappedText style={styles.location}>{from}</WrappedText>
          <WrappedText style={styles.seperator}>
            <MaterialCommunityIcons name="arrow-right" size={24} />
          </WrappedText>
          <WrappedText style={styles.location}>{to}</WrappedText>
          <WrappedText style={styles.seperator}>∕</WrappedText>
          <WrappedText style={styles.id}>{transportId}</WrappedText>
        </View>
      </View>
    </View>
  );
};

export default TravelRecordTile;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 6,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  date: {
    color: '#979797'
  },
  location: {
    paddingVertical: 6,
    fontSize: 18
  },
  seperator: {
    marginHorizontal: 6
  },
  id: {
    paddingVertical: 6
  }
});
