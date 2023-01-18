import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import colors from '@App/constants/colors';
import {INotificationProps} from '@App/utilis/types';

import styles from './styles';

export default function Notification(props: INotificationProps) {
  return (
    <Pressable
      onPress={props.onNotificationClick}
      style={[
        styles.notification,
        {
          backgroundColor: props.status ? colors.primary : colors.notification,
        },
      ]}>
      <Image style={styles.image} source={{uri: props.image}} />
      <View>
        <Text style={styles.heading}>{props.name}</Text>
        <Text style={styles.description}>{props.message}</Text>
      </View>
      {!props.status && <View style={styles.dot} />}
    </Pressable>
  );
}
