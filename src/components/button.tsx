import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '@src/themes';
interface Props {
  isLoading?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  title: string;
}
export const Button = (props: Props) => {
  const {isLoading, style, onPress, title} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      onPress={onPress}
      style={[styles.container, style]}>
      {isLoading ? (
        <ActivityIndicator color={COLORS.WHITE} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    color: COLORS.WHITE,
  },
});
