import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {COLORS} from '@src/themes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootNavigationProp, RootStackParamList} from '@src/navigation';
import {CommonActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {removeEncryptKey, saveData} from '@src/utils';
export const MenuItems = () => {
  const navigation = useNavigation<RootNavigationProp>();

  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  const items: {
    name: string;
    screen: keyof RootStackParamList;
  }[] = [
    {
      name: 'Home',
      screen: 'MapScreen',
    },
    {
      name: 'My Places',
      screen: 'MyPlacesScreen',
    },
  ];
  const onPress = (screen: any) => {
    hideMenu();
    setTimeout(() => {
      navigation.navigate(screen);
    }, 500);
  };

  const logout = () => {
    auth()
      .signOut()
      .then(_ => {
        removeEncryptKey('USER_SESSION');
        hideMenu();
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AuthScreen'}],
            }),
          );
        }, 500);
      });
  };
  return (
    <View style={styles.container}>
      <Menu
        animationDuration={400}
        visible={visible}
        anchor={
          <Icon
            name="menu"
            size={20}
            color={COLORS.PRIMARY}
            onPress={showMenu}
          />
        }
        onRequestClose={hideMenu}>
        {items.map(i => {
          return (
            <MenuItem key={i.name} onPress={() => onPress(i.screen)}>
              <Text style={{color: COLORS.PRIMARY}}>{i.name}</Text>
            </MenuItem>
          );
        })}

        <MenuDivider />
        <MenuItem onPress={logout}>
          <Text style={{color: COLORS.PRIMARY}}>{'Log out'}</Text>
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: COLORS.WHITE,
    width: 40,
    height: 40,
    borderRadius: 55,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    top: 20,
  },
});
