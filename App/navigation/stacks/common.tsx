import React from 'react';

import colors from '@App/constants/colors';
import {ChatListScreen, MoreScreen} from '@App/screens';
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

export function ChatStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'Chat',
      }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />
    </Stack.Navigator>
  );
}

export function MoreStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...HeaderOptions,
        headerTitle: 'More',
      }}>
      <Stack.Screen name="MoreScreen" component={MoreScreen} />
    </Stack.Navigator>
  );
}
