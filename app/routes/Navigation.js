import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/LoginScreen';
import UserScreen from '../screens/UserScreen';
import PresensiScreen from '../screens/PresensiScreen';
import StudentScreen from '../screens/StudentScreen';
// import QRCoodeDataScreen from '../screens/QRCodeDataScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../providers/auth';

const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tapBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default () => {
  const {state} = useAuth();
  console.debug('nav', useAuth());

  return (
    <RootStack.Navigator>
      {state.isLoggedIn ? (
        <>
          <RootStack.Screen
            name="Home"
            component={HomeTab}
            options={({route}) => ({
              headerTitle: getFocusedRouteNameFromRoute(route),
              headerShown: false,
              animationTypeForReplace: 'pop',
            })}
          />
          <RootStack.Screen name="Presensi" component={PresensiScreen} />
          <RootStack.Screen name="Siswa" component={StudentScreen} />
          {/* <RootStack.Screen name="Presensi" component={QRCoodeDataScreen} /> */}
        </>
      ) : (
        <>
          <RootStack.Screen
            name="Splash"
            options={{headerShown: false, animationTypeForReplace: 'pop'}}>
            {(props) => <SplashScreen {...props} />}
          </RootStack.Screen>
          <RootStack.Screen
            name="Login"
            options={{headerShown: false, animationTypeForReplace: 'pop'}}>
            {(props) => <SignInScreen {...props} />}
          </RootStack.Screen>
        </>
      )}
    </RootStack.Navigator>
  );
};
