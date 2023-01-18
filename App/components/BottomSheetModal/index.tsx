import React from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';

import colors from '@App/constants/colors';
import {Form} from '@App/utilis';
import {IBottomSheetModal} from '@App/utilis/types';

import styles from './styles';
import {Loader} from '..';

export default function BottomSheetModal(props: IBottomSheetModal) {
  const {height} = useWindowDimensions();

  return (
    <Modal
      style={{...styles.modal, ...props.contentContainerStyle}}
      onBackButtonPress={props.onClose}
      onBackdropPress={props.onClose}
      isVisible={props.isVisible}>
      {props.loader && <Loader loader={props.loader} />}
      <Form behavior="padding">
        <View
          style={{
            height: height / 1.9,
            backgroundColor: colors.white,
            ...props.containerStyle,
          }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <AntDesign name="arrowleft" size={25} onPress={props.onClose} />
              <Text style={styles.heading}>{props.heading}</Text>
              <View />
            </View>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {props.children}
            </ScrollView>
          </View>
        </View>
      </Form>
    </Modal>
  );
}
