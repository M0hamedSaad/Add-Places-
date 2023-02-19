import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Back, PlaceCard} from '@src/components';
import {COLORS} from '@src/themes';
import {IPlace} from './MapScreen';
import database from '@react-native-firebase/database';
import {getUserEmail} from '@src/utils';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '@src/navigation';

export const MyPlacesScreen = () => {
  const navigation = useNavigation<RootNavigationProp>();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const isFocused = useIsFocused();
  const onPress = async (place: IPlace) => {
    navigation.navigate('PlaceScreenDetails', {
      place,
      email: await getUserEmail(),
    });
  };
  const renderItem: ListRenderItem<IPlace> = ({item}) => (
    <PlaceCard item={item} onPress={onPress} />
  );

  useEffect(() => {
    if (isFocused)
      getUserEmail().then(email => {
        database()
          .ref(`/places/${email}`)
          .once('value', snapshot => {
            if (snapshot.exists()) setPlaces(Object.values(snapshot.val()));
            console.log('my places', snapshot.val());
          });
      });
    else
      getUserEmail().then(email => {
        database().ref(`/places/${email}`).off();
      });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Back />
      <Text style={styles.title}>My Places</Text>
      <FlatList
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: COLORS.PRIMARY,
    fontSize: 20,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});
