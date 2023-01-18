import React from 'react';

import colors from '@App/constants/colors';
import {
  BookingsScreen,
  ProviderHomeScreen,
  ProviderProfileScreen,
  
} from '@App/screens';
import {createStackNavigator} from '@react-navigation/stack';
import fonts from '@App/constants/fonts';

const Stack = createStackNavigator();

const HeaderOptions = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  headerTintColor: colors.white,
  headerTitleAlign: 'center',
  headerLeft: () => null,
  headerBackTitle: '',
};

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'New Booking',
      }}>
      <Stack.Screen name="Home" component={ProviderHomeScreen} />
    </Stack.Navigator>
  );
}

export function BookingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Booking',
      }}>
      <Stack.Screen name="BookingsScreen" component={BookingsScreen} />
    </Stack.Navigator>
  );
}

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Profile',
      }}>
      <Stack.Screen name="ProviderProfile" component={ProviderProfileScreen} />
    </Stack.Navigator>
  );
}
