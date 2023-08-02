import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, LogBox, AppState} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {onLogin} from '../redux/slices/userSlice';
import CreateAccount from '../screens/AuthScreens/CreateAccount';
import Login from '../screens/AuthScreens/Login';
import Welcome from '../screens/AuthScreens/Welcome';
import WelcomeBack from '../screens/AuthScreens/WelcomeBack';
import FundsScreen from '../screens/HomeScreens/FundsScreen';
import SuccessPurchase from '../screens/HomeScreens/SuccessPurchase';
import TabNavigator from './TabNavigator';

const AuthStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

const AuthNavigator = () => {
  const welcome = useSelector(state => state.user.welcome);
  const token = useSelector(state => state.user.token);
  return (
    <AuthStack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}>
      {(welcome ||token==null)&& (
        <AuthStack.Screen
          name={'Welcome'}
          component={Welcome}
          screenOptions={{
            headerShown: false,
          }}
        />
      )}
      <AuthStack.Screen
        name={'WelcomeBack'}
        component={WelcomeBack}
        screenOptions={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={'Login'}
        component={Login}
        screenOptions={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={'CreateAccount'}
        component={CreateAccount}
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  return (
    <LoggedInStack.Navigator
      initialRouteName="LoggedInStack"
      screenOptions={{
        headerShown: false,
      }}>
      <LoggedInStack.Screen
        name={'TabNavigator'}
        component={TabNavigator}
        screenOptions={{
          headerShown: false,
        }}
      />
      <LoggedInStack.Screen
        name={'FundsScreen'}
        component={FundsScreen}
        screenOptions={{
          headerShown: false,
        }}
      />
      <LoggedInStack.Screen
        name={'SuccessPurchase'}
        component={SuccessPurchase}
        screenOptions={{
          headerShown: false,
        }}
      />
    </LoggedInStack.Navigator>
  );
};
const App = () => {
  const [appState, setPreviousState] = useState(AppState.currentState);
  const rememberCredentials = useSelector(state => state.user.remember);
  const dispatch = useDispatch();
  //   let appStateListner;

  //   const  handleAppStateChange = async nextAppState => {
  //      if (
  //        appState.match(/inactive|background/) &&
  //        nextAppState === 'active'
  //      ) {
  //        dispatch(onLogin(false))
  //        console.log('App has come to the foreground!');
  //      } else {
  //        console.log(`App went to the ${nextAppState} state!`);
  //      }
  //      setPreviousState(nextAppState);

  //    };

  //    useEffect(() => {
  //      appStateListner = AppState.addEventListener(
  //        'change',
  //        handleAppStateChange,
  //      );

  //      //un mount
  //    return () => {
  //      appStateListner?.remove?.();
  //    };
  //  }, []);
  useEffect(() => {
    if (rememberCredentials == false&&isLogin) {
      dispatch(onLogin(true));
    } else {
      dispatch(onLogin(false));
    }
  }, []);
  const isLogin = useSelector(state => state.user.isLogin);

  return <>{isLogin ? <LoggedInNavigator /> : <AuthNavigator />}</>;
};

export default App;
