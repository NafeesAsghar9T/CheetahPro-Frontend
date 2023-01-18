import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import colors from '@App/constants/colors';
import {OngoingOrdersScreen, OrderHistoryScreen} from '@App/screens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function CustomTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        height: 70,
        alignItems: 'center',
        marginTop: 15,
      }}>
      {state.routes.map((route, index) => {
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
            style={{flex: 1, marginHorizontal: 15}}>
            <Text
              style={{
                textAlign: 'center',
                color: isFocused ? colors.accent : colors.grey,
                fontSize: 18,
                fontFamily: 'Segoe UI Semibold',
                marginBottom: 3,
              }}>
              {label}
            </Text>
            <View
              style={{
                borderBottomColor: isFocused ? colors.accent : colors.grey,
                borderBottomWidth: 1,
              }}
            />
            <View
              style={{
                borderBottomColor: isFocused ? colors.accent : colors.grey,
                borderBottomWidth: 1,
                marginTop: 0.7,
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function OrdersTab() {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Ongoing Order" component={OngoingOrdersScreen} />
      <Tab.Screen name="Order History" component={OrderHistoryScreen} />
    </Tab.Navigator>
  );
}
