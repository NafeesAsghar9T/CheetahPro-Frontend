import React from 'react';
import {Text, View} from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import Colors from '@App/constants/colors';

import styles from './styles';

type Transaction = {
  first_name: string;
  last_name: string;
  date: string;
  pay_out: string;
};

export default function Transaction({item}: {item: Transaction}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <View style={styles.imageContainer}>
          <Ionicons name="arrow-down" size={30} color={Colors.white} />
        </View>
        <View>
          <Text style={styles.heading}>
            {item.first_name} {item.last_name}
          </Text>
          <Text style={styles.date}>
            {moment(item.date).format('MMM DD, h:mm a')}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Foundation name="pound" size={20} color={Colors.white} />
        <Text style={styles.heading}>{item.pay_out}</Text>
      </View>
    </View>
  );
}
