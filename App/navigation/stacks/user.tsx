import React from 'react';

import {
  UserHomeScreen,
  UserBookingsScreen,
  UserProfileScreen,
  HelpCenterSceen,
  AboutUsScreen,
  NotificationsScreen,
} from '@App/screens';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

const Stack = createStackNavigator();

const HeaderOptions = {
  headerStyle: {backgroundColor: colors.primary},
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  headerTintColor: colors.white,
  headerTitleAlign: 'center',
  headerLeft: () => null,
  headerBackTitle: undefined,
};

export function UserHomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Home',
      }}>
      <Stack.Screen name="UserHomeScreen" component={UserHomeScreen} />
    </Stack.Navigator>
  );
}

export function UserBookingStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Booking',
      }}>
      <Stack.Screen name="UserBookings" component={UserBookingsScreen} />
    </Stack.Navigator>
  );
}

export function HelpStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Service Help Center',
      }}>
      <Stack.Screen name="HelpCenter" component={HelpCenterSceen} />
    </Stack.Navigator>
  );
}

export function AboutStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'About Us',
      }}>
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

export function UserProfileStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Profile',
      }}>
      <Stack.Screen name="ProviderProfile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}

export function UserNotificationsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Notifications',
      }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
