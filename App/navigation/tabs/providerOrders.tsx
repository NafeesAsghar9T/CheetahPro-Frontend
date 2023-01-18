import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import colors from '@App/constants/colors';
import {BookingsListScreen} from '@App/screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import fonts from '@App/constants/fonts';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({
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
        justifyContent: 'center',
        height: 70,
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

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
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
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              marginHorizontal: 15,
              alignItems: 'center',
              borderBottomColor: colors.primary,
              borderBottomWidth: isFocused ? 3 : 0,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.primary,
                fontSize: 16,
                fontFamily: fonts.Medium,
                lineHeight: 30,
                opacity: isFocused ? 1 : 0.7,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ProviderOrders() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Accept',
        }}
        name="Accept"
        component={BookingsListScreen}
      />
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Pending',
        }}
        name="PendingApproval"
        component={BookingsListScreen}
      /> */}
      <Tab.Screen
        options={{
          tabBarLabel: 'Cancelled',
        }}
        name="Cancelled"
        component={BookingsListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Completed',
        }}
        name="Completed"
        component={BookingsListScreen}
      />
    </Tab.Navigator>
  );
}
