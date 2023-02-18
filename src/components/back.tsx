import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '@src/themes';
import {useNavigation} from '@react-navigation/native';
export const Back = () => {
  const navigation = useNavigation();
  return navigation.canGoBack() ? (
    <TouchableOpacity style={{width: 25}} onPress={navigation.goBack}>
      <Icon name="md-chevron-back" color={COLORS.PRIMARY} size={25} />
    </TouchableOpacity>
  ) : null;
};

const styles = StyleSheet.create({});
