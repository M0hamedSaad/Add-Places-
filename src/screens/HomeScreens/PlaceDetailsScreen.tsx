import database, {firebase} from '@react-native-firebase/database';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {ActionsSheet, Back, Button, Input} from '@src/components';
import {RootStackParamList} from '@src/navigation';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import * as Yup from 'yup';

interface Values {
  name: string;
  phoneNumber: string;
  placeType: string;
  lat?: number;
  lng?: number;
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required!')
    .min(4, 'Password must contain at least 4 characters.'),
  phoneNumber: Yup.string()
    .required('Phone is required!')
    .matches(phoneRegExp, 'Phone number is not valid'),
  placeType: Yup.string().required('Place type is required!'),
  lat: Yup.number()
    .typeError('Latitude must be a number')
    .required('Latitude is required!'),
  lng: Yup.number()
    .typeError('longitude must be a number')
    .required('longitude is required!'),
});

export const PlaceDetailsScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'PlaceScreenDetails'>>();
  const isUpdate = params.place;

  console.log(params);

  const referenceToPush = database()
    .ref(`places/${params.email}/${isUpdate ? params.place.id : ''}`)
    .push();

  const referenceToUpdate = database().ref(
    `places/${params.email}/${isUpdate ? params.place.id : ''}`,
  );
  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: 'Successfully!!',
      text2: message,
    });
  };

  const onSubmit = (values: Values) => {
    setLoading(true);
    console.log({values}, values.placeType.toLocaleUpperCase());

    if (isUpdate) {
      referenceToUpdate
        .update({
          ...params.place,
          ...values,
          placeType: values.placeType.toLocaleUpperCase(),
        })
        .then(() => {
          showToast('Your place updated successfully!');
          navigation.goBack();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      referenceToPush
        .set({
          id: referenceToPush.key,
          ...values,
          placeType: values.placeType.toLocaleUpperCase(),
        })
        .then(() => {
          showToast('Your place added successfully!');
          navigation.goBack();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const options = ['Home', 'Restaurant', 'Park'];
  return (
    <View style={styles.container}>
      <Back />

      <Formik
        initialValues={{
          lat: isUpdate ? params.place.lat : params.coordinate?.latitude,
          lng: isUpdate ? params.place.lng : params.coordinate?.longitude,
          name: isUpdate ? params.place.name : '',
          phoneNumber: isUpdate ? params.place.phoneNumber : '',
          placeType: isUpdate
            ? options[
                options.findIndex(
                  i =>
                    i.toLowerCase() ==
                    params.place?.placeType.toLocaleLowerCase(),
                )
              ]
            : '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => onSubmit(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
          values,
        }) => (
          <View style={styles.form}>
            <ActionsSheet
              style={styles.input}
              options={options}
              onChangeText={handleChange('placeType')}
              text={values.placeType}
              placeholder="Select place type"
              error={touched.placeType ? errors.placeType : ''}
            />
            <Input
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Name"
              containerStyle={styles.input}
              value={values.name}
              error={touched.name ? errors.name : ''}
            />
            <Input
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              placeholder="Phone Number"
              containerStyle={styles.input}
              value={values.phoneNumber}
              error={touched.phoneNumber ? errors.phoneNumber : ''}
            />

            {isUpdate && (
              <View style={styles.row}>
                <Input
                  onChangeText={handleChange('lat')}
                  onBlur={handleBlur('lat')}
                  placeholder="Latitude"
                  containerStyle={[styles.input, {width: '47%'}]}
                  value={values.lat?.toString()}
                  error={touched.lat ? errors.lat : ''}
                />

                <Input
                  onChangeText={handleChange('lng')}
                  onBlur={handleBlur('lng')}
                  placeholder="Longitude"
                  containerStyle={[styles.input, {width: '47%'}]}
                  value={values.lng?.toString()}
                  error={touched.lng ? errors.lng : ''}
                />
              </View>
            )}

            <Button
              isLoading={loading}
              onPress={handleSubmit}
              title={'Save'}
              style={styles.btn}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginTop: 20,
  },
  btn: {
    marginTop: 'auto',
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
