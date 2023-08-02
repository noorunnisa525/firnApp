import {useKeyboard} from '@react-native-community/hooks';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import Profile from '../../assets/icons/Profile.svg';
import ProfileActive from '../../assets/icons/ProfileActive.svg';
import Invest from '../../assets/icons/Invest.svg';
import InvestActive from '../../assets/icons/InvestActive.svg';
import Portfolio from '../../assets/icons/Portfolio.svg';
import PortfolioActive from '../../assets/icons/PortfolioActive.svg';
import Home from '../screens/HomeScreens/Home';
import Account from '../screens/HomeScreens/Account';
import PortfolioScreen from '../screens/HomeScreens/Portfolio';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from '../components/CustomText';
import AccountSettings from '../screens/HomeScreens/AccountSettings';

const Tab = createBottomTabNavigator();
const AccountStack = createNativeStackNavigator();

const AccountTab = ({route}) => {
  return (
    <AccountStack.Navigator
      initialRouteName="AccountTab"
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name={'Account'} component={Account} />

      <AccountStack.Screen
        name={'AccountSettings'}
        component={AccountSettings}
      />
    </AccountStack.Navigator>
  );
};
const TabNavigator = ({route}) => {
  const keyboard = useKeyboard();
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      tabBar: {
        padding: wp(3),
        paddingBottom: hp(1),
        flexDirection: 'row',
        width: wp(100),
        height: hp(8),
        backgroundColor: 'white',
        justifyContent: 'space-around',
        paddingHorizontal: wp(5),
        borderWidth: 0.4,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 10,
        position: 'absolute',
        bottom: keyboard.keyboardShown ? -1000 : 0,
      },
      textStyle: {
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        fontSize: theme.size.xSmall,
        color: theme.color.textBlack,
      },
      TextStyleUnfocused: {
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        fontSize: theme.size.xSmall,
        color: theme.color.dividerColor,
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true, // keyboardHidesTabBar: true,
          tabBarStyle: styles.tabBar,
          tabBarAllowFontScaling: false,
          tabBarInactiveBackgroundColor: 'transparent',
          tabBarInactiveTintColor: 'transparent',
          unmountOnBlur: true,
        }}
        backBehavior="initialRoute">
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={focused ? styles.textStyle : styles.TextStyleUnfocused}>
                Invest
              </Text>
            ),
            tabBarInactiveBackgroundColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarIcon: ({focused}) =>
              focused ? <InvestActive /> : <Invest />,
          }}
        />
        <Tab.Screen
          name="Portfolio"
          component={PortfolioScreen}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={focused ? styles.textStyle : styles.TextStyleUnfocused}>
                Portfolio
              </Text>
            ),
            tabBarInactiveBackgroundColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarIcon: ({focused}) =>
              focused ? <PortfolioActive /> : <Portfolio />,
          }}
        />
        <Tab.Screen
          name="AccountTab"
          component={AccountTab}
          options={{
            tabBarLabel: ({focused, color, size}) => (
              <Text
                style={focused ? styles.textStyle : styles.TextStyleUnfocused}>
                Account
              </Text>
            ),
            tabBarInactiveBackgroundColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarIcon: ({focused}) =>
              focused ? <ProfileActive /> : <Profile />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;
