import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ActivityIndicator, LogBox, SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';
import GlobalFont from 'react-native-global-font';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigation/index';
import {persistor, store} from './src/redux/store';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  useEffect(() => {
    let fontName = 'Poppins-Light';
    GlobalFont.applyGlobal(fontName);
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
