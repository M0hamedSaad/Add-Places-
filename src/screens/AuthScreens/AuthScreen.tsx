import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Button, ErrorMessage, Input} from '@src/components';
import {RootNavigationProp} from '@src/navigation';
import {COLORS} from '@src/themes';
import {saveData} from '@src/utils';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import * as Yup from 'yup';

interface user {
  email: string;
  password: string;
}
export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation<RootNavigationProp>();

  const onSuccess = (user: user) => {
    saveData('USER_SESSION', user);
    navigation.replace('MapScreen');
  };
  const onSubmit = (user: user) => {
    setErrorMessage('');
    setLoading(true);
    if (isLogin) {
      auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(_ => {
          onSuccess(user);
        })
        .catch(err => setErrorMessage(err.message))
        .finally(() => setLoading(false));
    } else {
      auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(_ => {
          onSuccess(user);
        })
        .catch(err => setErrorMessage(err.message))
        .finally(() => setLoading(false));
    }
  };

  const toggle = () => {
    setIsLogin(!isLogin);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required!')
      .min(6, 'Password must contain at least 6 characters.'),
    email: Yup.string()
      .email(
        'Invalid email ! The email you are using is not valid, login using different valid email.',
      )
      .required('Email is required!'),
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Login' : 'Create Account'}</Text>
      <View style={styles.cardContainer}>
        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={values => onSubmit(values)}>
          {({handleChange, handleBlur, handleSubmit, errors, touched}) => (
            <ScrollView>
              <Input
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Email"
                containerStyle={styles.input}
                error={touched.email ? errors.email : ''}
                keyboardType="email-address"
              />
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder="Password"
                secureTextEntry
                containerStyle={styles.input}
                error={touched.password ? errors.password : ''}
              />
              <Button
                isLoading={loading}
                onPress={handleSubmit}
                title={isLogin ? 'Login' : 'Create Account'}
                style={styles.btn}
              />
            </ScrollView>
          )}
        </Formik>
        <ErrorMessage error={errorMessage} />

        <Text style={styles.text}>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <Text onPress={toggle} style={{color: COLORS.SECONDARY}}>
            {isLogin ? ' Sign up' : ' Sign in'}
          </Text>
        </Text>
      </View>
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
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 3,
    borderRadius: 8,
  },
  text: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 5,
  },
  input: {
    marginTop: 20,
  },
  btn: {
    marginVertical: 20,
  },
});
