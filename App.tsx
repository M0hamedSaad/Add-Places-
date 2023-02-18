import 'react-native-gesture-handler';
import {RootStack} from '@src/navigation';
import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView mode="padding" style={styles.container}>
        <RootStack />
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});
