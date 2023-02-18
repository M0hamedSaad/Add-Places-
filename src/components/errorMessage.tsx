import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  error: string;
}
export const ErrorMessage = (props: Props) => {
  return props.error ? (
    <View style={styles.errorContainer}>
      <Text style={styles.error}>{props.error}</Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  errorContainer: {
    width: '100%',
    backgroundColor: '#FF9E001A',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  error: {
    color: '#D28505',
    textAlign: 'left',
    fontSize: 13,
  },
});
