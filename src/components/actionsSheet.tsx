import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import ActionSheet from 'react-native-actionsheet';
import {COLORS} from '@src/themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ViewStyle} from 'react-native';
import {ErrorMessage} from './errorMessage';
import Icon from 'react-native-vector-icons/AntDesign';
interface Props {
  options: Array<string>;
  onChangeText: (value: string) => void;
  text: string;
  style?: ViewStyle;
  placeholder?: string;
  error?: string;
}
export const ActionsSheet = (props: Props) => {
  const ref = useRef<ActionSheet>(null);
  const showActionSheet = () => {
    ref.current?.show();
  };
  const data = [...props.options, 'Cancel'];
  return (
    <>
      <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={showActionSheet}>
        <Text style={{color: props.text ? COLORS.PRIMARY : 'gray'}}>
          {props.text ? props.text : props.placeholder}
        </Text>
        <Icon name="caretdown" size={12} color={COLORS.PRIMARY} />
      </TouchableOpacity>
      {props.error && <ErrorMessage error={props.error} />}

      <ActionSheet
        ref={ref}
        tintColor={COLORS.PRIMARY}
        title={'Which place type do you select ?'}
        options={data}
        // destructiveButtonIndex={data.length - 1}
        cancelButtonIndex={data.length - 1}
        onPress={index => {
          if (index != data.length - 1)
            props.onChangeText(props.options[index]);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    textAlign: 'left',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    width: '100%',
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.PRIMARY,
    fontSize: 14,
    textAlign: 'left',
  },
});
