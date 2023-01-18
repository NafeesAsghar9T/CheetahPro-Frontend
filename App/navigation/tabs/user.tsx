import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Neomorph} from 'react-native-neomorph-shadows';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@App/constants/colors';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  UserBookingStackNavigator,
  UserHomeStackNavigator,
  UserNotificationsStackNavigator,
  ChatStackNavigator,
  MoreStackNavigator,
} from '../stacks';
import fonts from '@App/constants/fonts';
import {NeomorphBox} from '@App/components';

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
        backgroundColor: colors.background,
        height: 100,
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
            <NeomorphBox
              // darkShadowColor={colors.primary} // <- set this
              // lightShadowColor={colors.white} // <- this
              style={{
                // shadowOpacity: 0.3, // <- and this or yours opacity
                // shadowRadius: 2,
                // shadowOffset: {width: 0, height: 1},
                // borderRadius: 10,
                // backgroundColor: colors.white,
                width: 65,
                height: 65,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 0,
                paddingHorizontal: 0,
              }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                {tabIcon({
                  color: isFocused ? colors.primary : colors.grey,
                })}
                <Text
                  style={{
                    color: isFocused ? colors.primary : colors.grey,
                    fontFamily: isFocused ? fonts.SemiBold : fonts.Regular,
                    fontSize: 12,
                  }}>
                  {label}
                </Text>
              </View>
            </NeomorphBox>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="UserHome"
        component={UserHomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Feather color={color} name="home" size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={UserBookingStackNavigator}
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

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
