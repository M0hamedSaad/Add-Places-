import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  AuthScreen,
  Coordinate,
  IPlace,
  MapScreen,
  PlaceDetailsScreen,
} from '@src/screens';
import {MyPlacesScreen} from '@src/screens/HomeScreens/MyPlacesScreen';
import {COLORS} from '@src/themes';
import {getData} from '@src/utils';
import React, {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();
export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type RootStackParamList = {
  AuthScreen: undefined;
  MapScreen: undefined;
  PlaceScreenDetails: {place?: IPlace; coordinate?: Coordinate; email: string};
  MyPlacesScreen: undefined;
};

export const RootStack = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isCheckLogging, setIsCheckLogging] = useState(false);

  useEffect(() => {
    getData('USER_SESSION')
      .then(_ => {
        setIsLogged(_ ? true : false);
      })
      .finally(() => setIsCheckLogging(true));
  }, []);

  return (
    <NavigationContainer>
      {isCheckLogging && (
        <Stack.Navigator
          initialRouteName={isLogged ? 'MapScreen' : 'AuthScreen'}
          screenOptions={{
            animation: 'slide_from_right',
            headerShown: false,
            orientation: 'portrait',
            contentStyle: {
              display: 'flex',
              backgroundColor: COLORS.WHITE,
              flex: 1,
            },
          }}>
          <Stack.Screen name={'AuthScreen'} component={AuthScreen} />
          <Stack.Screen name={'MapScreen'} component={MapScreen} />
          <Stack.Screen name={'MyPlacesScreen'} component={MyPlacesScreen} />
          <Stack.Screen
            name={'PlaceScreenDetails'}
            component={PlaceDetailsScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
