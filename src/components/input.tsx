import {StyleSheet, Text, TextInputProps, View, ViewStyle} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '@src/themes';
import {ErrorMessage} from './errorMessage';
interface Props extends TextInputProps {
  error?: string;
  containerStyle?: ViewStyle | Array<ViewStyle>;
}
export const Input = (props: Props) => {
  return (
    <View style={[{width: '100%'}, props.containerStyle]}>
      <Text style={styles.label}>{props.placeholder}</Text>
      <TextInput
        placeholderTextColor={'gray'}
        numberOfLines={1}
        // verticalAlign="middle"
        // textAlignVertical="center"
        // multiline
        {...props}
        style={[styles.inputStyle, props.style]}
      />
      {props.error && <ErrorMessage error={props.error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    width: '100%',
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    color: COLORS.PRIMARY,
    textAlignVertical: 'center',
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
});
