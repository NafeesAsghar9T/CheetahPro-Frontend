import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, Text, useWindowDimensions, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  Button,
  Container,
  Input,
  NeomorphBox,
  RadioButton,
} from '@App/components';
import {RootStackParamList} from '@App/utilis/types';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import styles from './styles';
import {Form, offset} from '@App/utilis';

type BookNowRouteProp = RouteProp<RootStackParamList, 'BookNow'>;

export default function BookNowScreen() {
  const route = useRoute<BookNowRouteProp>();
  const {selectedServices, charges, provider} = route.params;

  const [timeType, setTimeType] = useState('now');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false);
  const [isSchedule, setIsSchedule] = useState(false);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');

  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    setDate(date);
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <Form
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={offset.eighty}>
          <View style={{marginTop: 30}}>
            <View style={{alignItems: 'center'}}>
              <NeomorphBox
                style={{
                  width: width / 1.1,
                  height: 130,
                  marginBottom: 15,
                  padding: 10,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.heading}>
                      Select your desired service time
                    </Text>
                  </View>
                  <View>
                    <RadioButton
                      style={{marginBottom: 5}}
                      checked={timeType === 'now' ? true : false}
                      onCheck={() => {
                        setTimeType('now');
                        setIsToday(true);
                        setIsSchedule(false);
                      }}
                      label="Today"
                    />
                    <RadioButton
                      checked={timeType === 'schedule' ? true : false}
                      onCheck={() => {
                        setTimeType('schedule');
                        setDatePickerVisibility(true);
                        setIsSchedule(true);
                        setIsToday(false);
                      }}
                      label="Schedule"
                    />
                    <View />
                  </View>
                </View>
              </NeomorphBox>
            </View>

            {isSchedule && (
              <View>
                <Text
                  style={[
                    styles.heading,
                    {
                      margin: 15,
                      marginBottom: 10,
                    },
                  ]}>
                  Booking time
                </Text>
                <View style={{alignItems: 'center'}}>
                  <NeomorphBox
                    style={{
                      width: width / 1.1,
                      height: 45,
                      marginBottom: 10,
                      marginTop: 0,
                    }}>
                    <Text style={styles.subHeading}>
                      {moment(date).format('YYYY-MM-DD')} -{' '}
                      {moment(date).format('h:mm A')}
                    </Text>
                  </NeomorphBox>
                </View>
              </View>
            )}

            <View>
              <Text style={[styles.heading, {margin: 15, marginBottom: 10}]}>
                Enter address
              </Text>
              <View style={{alignItems: 'center'}}>
                <Input
                  value={address}
                  onChangeText={text => setAddress(text)}
                  placeholder="Address"
                />
              </View>
            </View>
            <View style={{top: -10}}>
              <Text style={[styles.heading, {margin: 15, marginBottom: 10}]}>
                Do you have any notes or special requests?
              </Text>
              <View style={{alignItems: 'center'}}>
                <Input
                  placeholder="Note here..."
                  value={note}
                  onChangeText={text => setNote(text)}
                />
              </View>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', margin: 15}}>
            <Button
              title="Next"
              onPress={() =>
                navigation.navigate('ConfirmBooking', {
                  bookingDetails: {
                    date,
                    isToday,
                    isSchedule,
                    note,
                    address,
                  },
                  provider,
                  selectedServices,
                  charges,
                })
              }
            />
          </View>
        </Form>
      </ScrollView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={date}
      />
    </Container>
  );
}
