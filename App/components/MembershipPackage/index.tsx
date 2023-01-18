import React, {useState} from 'react';
import {Pressable, Text, useWindowDimensions, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import colors from '@App/constants/colors';
import {IMembershipPackageProps} from '@App/utilis/types';

import NeomorphBox from '../NeomorphBox';
import styles from './styles';

export default function MembershipPackage(props: IMembershipPackageProps) {
  const {width} = useWindowDimensions();

  const selectedColor = props.isSelected ? colors.white : colors.black;
  return (
    <NeomorphBox
      style={{
        width: width / 1.1,
        height: 100,
        paddingHorizontal: 0,
        borderWidth: 0,
      }}>
      <Pressable
        onPress={props.onPress}
        style={[
          styles.package,
          {
            backgroundColor: props.isSelected
              ? colors.primary
              : colors.background,
          },
        ]}>
        <View style={styles.row}>
          <View>
            <Text style={[styles.title, {color: selectedColor}]}>
              {props.title}
            </Text>
            <Text style={[styles.title, {color: selectedColor}]}>
              {props.sub_title}
            </Text>
          </View>
          {props.isSelected && (
            <Feather name="check" color={colors.white} size={20} />
          )}
        </View>
        <View>
          <Text style={[styles.amount, {color: selectedColor}]}>
            ${props.price}
          </Text>
          <Text style={[styles.amount, {color: selectedColor}]}>
            /{props.plan_duration}
          </Text>
        </View>
        {/* <Text style={[styles.amount, {color: selectedColor}]}>
            ${props.price} /{props.plan_duration}
          </Text>  */}
      </Pressable>
    </NeomorphBox>
  );
}
