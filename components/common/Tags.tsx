import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Tag from './Tag';
import { TagItem } from './types';

interface Props {
  items: TagItem[];
  selected: string[];
  onToggle: (name: string) => void;
}

const Tags: FC<Props> = ({ items, selected, onToggle }) => {
  return (
    <View style={styles.container}>
      {items.map(item => {
        const itemSelected = selected.indexOf(item.name) >= 0;
        const onToggleCb = () => onToggle(item.name);

        return (
          <View key={item.name} style={styles.item}>
            <Tag
              text={item.text}
              selected={itemSelected}
              onToggle={onToggleCb}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: { marginTop: 6, marginRight: 6 }
});
