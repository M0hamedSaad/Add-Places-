import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '@src/assets';
import {Button, MenuItems} from '@src/components';
import {RootNavigationProp} from '@src/navigation';
import {getUserEmail} from '@src/utils';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {GRAY_MAP_STYLE} from './MapStyle';

export interface Coordinate {
  latitude: number;
  longitude: number;
}
const delta = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};
export enum PLACE_TYPE {
  RESTAURANT = 'RESTAURANT',
  HOME = 'HOME',
  PARK = 'PARK',
}
export interface IPlace {
  id: string;
  placeType: keyof typeof PLACE_TYPE;
  name: string;
  phoneNumber: string;
  lat: number;
  lng: number;
}
export const MapScreen = () => {
  const ref = useRef<MapView>(null);
  const [coordinate, setCoordinate] = useState<Coordinate>();
  const [places, setPlaces] = useState<IPlace[]>([]);
  const navigation = useNavigation<RootNavigationProp>();

  const getPlaces = async () => {
    database()
      .ref(`/places/${await getUserEmail()}`)
      .on('value', snapshot => {
        if (snapshot.exists()) {
          setPlaces(Object.values(snapshot.val()));
        }
        console.log('places: ', snapshot.val());
      });
  };
  useEffect(() => {
    checkPermission();
    getPlaces();
  }, []);

  const checkPermission = () => {
    if (Platform.OS == 'ios') {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            requestPermission();
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            getCurrentLocation();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      });
    } else {
      requestLocationPermission();
    }
  };

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const requestPermission = () => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      if (result == 'granted') getCurrentLocation();
    });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      pos => {
        console.log('current location is->', pos.coords);
        setCoordinate(pos.coords);
      },
      err => {
        console.log('current location error.', err.message);
        setCoordinate({latitude: 37.78825, longitude: -122.4324});
      },
    );
  };

  useEffect(() => {
    if (coordinate)
      ref.current?.animateToRegion({...delta, ...coordinate}, 500);
  }, [coordinate]);

  const onRegionChangeComplete = async (props: Region) => {
    // console.log({props});
    const coordinate_ = {latitude: props.latitude, longitude: props.longitude};
    // setCoordinate(coordinate_);
  };

  const onPressMap = (event: MapPressEvent) => {
    console.log(event.nativeEvent.coordinate);
    setCoordinate(event.nativeEvent.coordinate);
  };

  const addPlace = async () => {
    navigation.navigate('PlaceScreenDetails', {
      coordinate,
      email: await getUserEmail(),
    });
  };

  const onPressMarker = async (place: IPlace) => {
    navigation.navigate('PlaceScreenDetails', {
      place,
      email: await getUserEmail(),
    });
  };

  return (
    <View style={styles.container}>
      {coordinate && (
        <MapView
          customMapStyle={GRAY_MAP_STYLE}
          provider={
            Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          style={styles.map}
          ref={ref}
          initialRegion={{
            ...coordinate,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          // showsUserLocation
          onPress={onPressMap}
          minZoomLevel={3}
          onRegionChangeComplete={onRegionChangeComplete}>
          {coordinate && (
            <Marker coordinate={coordinate} title={'My Current location'}>
              <Image
                source={IMAGES.PIN}
                style={styles.icon}
                resizeMode="contain"
              />
            </Marker>
          )}
          {places.map((place, index) => (
            <Marker
              onPress={() => {
                onPressMarker(place);
              }}
              key={index}
              coordinate={{latitude: place.lat, longitude: place.lng}}
              title={place.name}
              description={place.placeType}>
              <Image
                source={IMAGES[place.placeType]}
                style={styles.icon}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
      )}
      <MenuItems />
      <Button title="Add Place" style={styles.btn} onPress={addPlace} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  btn: {
    marginTop: 'auto',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 35,
    height: 35,
  },
});
