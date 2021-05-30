import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Navigation, UserStackNavigator} from './Navigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Navigation} />
      <Tab.Screen name="User" component={UserStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
