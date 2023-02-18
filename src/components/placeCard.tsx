import {IMAGES} from '@src/assets';
import {IPlace} from '@src/screens';
import {COLORS} from '@src/themes';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from './button';

interface Props {
  item: IPlace;
  onPress: (place: IPlace) => void;
}
export const PlaceCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={IMAGES[props.item.placeType]}
          style={styles.icon}
          //   resizeMode="contain"
        />
        <Text style={styles.name}>{props.item.name}</Text>
      </View>

      {/* <Text>
        Phone number: <Text style={styles.phone}>{props.item.phoneNumber}</Text>
      </Text> */}

      <Button
        onPress={() => {
          props.onPress(props.item);
        }}
        title="Edit"
        style={styles.btn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    marginStart: 10,
  },
  phone: {
    color: COLORS.SECONDARY,
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
  },
  btn: {
    width: '15%',
    height: 30,
    marginStart: 'auto',
  },
});
