import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@src/themes';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export const Back = () => {
  const navigation = useNavigation();
  return navigation.canGoBack() ? (
    <TouchableOpacity style={{width: 25}} onPress={navigation.goBack}>
      <Icon name="md-chevron-back" color={COLORS.PRIMARY} size={25} />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({});
