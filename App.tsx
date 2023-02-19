import 'react-native-gesture-handler';
import {RootStack} from '@src/navigation';
import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {COLORS} from '@src/themes';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log
const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.WHITE} />
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
