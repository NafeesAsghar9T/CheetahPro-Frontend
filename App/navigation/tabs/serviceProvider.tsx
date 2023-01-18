import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@App/constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  BookingStackNavigator,
  HomeStackNavigator,
  MoreStackNavigator,
  ChatStackNavigator,
} from '../stacks';

const Tab = createBottomTabNavigator();

function MyTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const tabIcon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={`${route.key}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            // accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <Neomorph
              darkShadowColor={colors.primary} // <- set this
              lightShadowColor={colors.white} // <- this
              style={{
                shadowOpacity: 0.3, // <- and this or yours opacity
                shadowRadius: 2,
                shadowOffset: {width: 0, height: 1},
                borderRadius: 10,
                backgroundColor: colors.white,
                width: 65,
                height: 65,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {tabIcon({
                  color: isFocused ? colors.primary : colors.grey,
                })}
                <Text
                  style={{
                    color: isFocused ? colors.primary : colors.grey,
                    fontFamily: isFocused ? 'Segoe UI Semibold' : 'Segoe UI',
                    fontSize: 12,
                  }}>
                  {label}
                </Text>
              </View>
            </Neomorph>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ServiceProviderTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="ProviderHome"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Feather color={color} name="home" size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingStackNavigator}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              color={color}
              name="calendar-month-outline"
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatStackNavigator}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color}) => (
            <Ionicons
              color={color}
              name="ios-chatbubble-ellipses-outline"
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color}) => (
            <EvilIcons color={color} name="navicon" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
