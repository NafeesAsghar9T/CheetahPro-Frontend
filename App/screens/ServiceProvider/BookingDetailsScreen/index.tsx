import moment from 'moment';
import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  Button,
  Container,
  Loader,
  NeomorphismElement,
  Review,
  NeomorphBox,
} from '@App/components';
import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {
  cancelOrder,
  orderDetails,
  rescheduleOrder,
  updateOrderStatus,
  updateUserOrderStatus,
} from '@App/utilis/APIs';
import {
  IOrderProps,
  IReviewProps,
  ISubService,
  OrderDetail,
  RootStackParamList,
} from '@App/utilis/types';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import styles from './styles';

type BookingDetailsRouteProp = RouteProp<RootStackParamList, 'BookingDetails'>;

type RadioProps = {
  onCheck: () => void;
  checked: boolean;
};

const Radio = (props: RadioProps) => (
  <Pressable onPress={props.onCheck} style={styles.radio}>
    {props.checked ? <View style={styles.checked} /> : null}
  </Pressable>
);

export default function BookingDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<BookingDetailsRouteProp>();
  const { id, isUser } = route.params;

  const [isCancelled, setIsCancelled] = useState(false);
  const [checked, setChecked] = useState('others');
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState<IOrderProps | undefined>(undefined);
  const [offeredServices, setOfferedServices] = useState([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isDate, setIsDate] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ratings, setRatings] = useState<IReviewProps[]>([]);
  const [total, setTotal] = useState(0);

  const { width } = useWindowDimensions();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
    setIsDate(true);

    _rescheduleOrder(date);
  };

  useFocusEffect(
    useCallback(() => {
      _orderDetails();
    }, []),
  );

  const _orderDetails = async () => {
    try {
      setLoader(true);
      const res = await orderDetails(id);
      setLoader(false);
      if (res && res.status === 'success') {
        setOrder(res.booking_detail);
        const charges = res.booking_detail.subservices_charges.reduce(
          (acc: number, curr: { service_charges: number }) =>
            acc + curr.service_charges,
          0,
        );
        setTotal(charges);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _cancelOrder = async () => {
    try {
      setIsCancelled(false);
      const data = new FormData();
      data.append('booking_id', id);
      data.append('booking_status', 'cancelled');

      const res = await cancelOrder(data);
      if (res && res.status === 'success') _orderDetails();
    } catch (error) { }
  };

  const _rescheduleOrder = async (selectedDate: Date) => {
    try {
      const data = new FormData();
      data.append('order_id', id);
      data.append('order_date', moment(selectedDate).format('lll'));
      await rescheduleOrder(data);
    } catch (error) { }
  };

  const _updateOrderStatus = async (status: string) => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('booking_id', id);
      data.append('booking_status', status);
      const res = await updateOrderStatus(data);
      setLoader(false);
      if (res && res.status === 'success') {
        _orderDetails();
        if (status === 'completed') {
          navigation.navigate('Rating', {
            provider: order?.provider_data,
            bookingId: id,
            main_service_name: order?.main_service_name,
          });
        }
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _updateUserOrderStatus = async (status: string) => {
    try {
      setLoader(true);
      const data = new FormData();
      data.append('booking_id', id);
      data.append('booking_status', status);
      const res = await updateUserOrderStatus(data);
      setLoader(false);
      if (res && res.status === 'success') {
        navigation.navigate('Rating', {
          provider: order?.provider_data,
          bookingId: id,
          main_service_name: order?.main_service_name,
        });
      }
    } catch (error) {
      setLoader(false);
    }
  };

  console.log("orderssss", order)

  return (
    <Container>
      {loader && <Loader loader={loader} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.headerContainer}>
          <NeomorphBox
            style={{
              width: width / 1.1,
              height: 100,
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                padding: 10,
              }}>
              <View style={{}}>
                <Text style={styles.heading}>{order?.main_service_name}</Text>
                <View style={styles.row}>
                  <MaterialIcons name="person" size={20} color={colors.black} />
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.Regular,
                      marginTop: 3,
                      marginLeft: 5,
                      fontSize: 15,
                    }}>
                    {!isUser
                      ? order?.user_data?.name
                      : order?.provider_data?.name}
                  </Text>
                </View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="local-phone"
                    size={20}
                    color={colors.black}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.Regular,
                      marginTop: 3,
                      marginLeft: 5,
                      fontSize: 15,
                    }}>
                    {!isUser
                      ? order?.user_data?.contactno
                      : order?.provider_data?.contactno}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '100%',
                }}>
                <View
                  style={{
                    backgroundColor:
                      order?.booking_status === 'on_the_way'
                        ? colors.onTheWay
                        : order?.booking_status === 'pending'
                          ? colors.purple
                          : order?.booking_status === 'cancelled'
                            ? colors.canceled
                            : order?.booking_status === 'completed'
                              ? colors.green
                              : order?.booking_status === 'arrived'
                                ? colors.arrived
                                : colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // width: 100,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontFamily: fonts.Regular,
                      fontSize: 12,
                      textTransform: 'capitalize',
                    }}>
                    {order?.booking_status === 'on_the_way'
                      ? 'On the way'
                      : order?.booking_status === 'progress'
                        ? 'In progress'
                        : order?.booking_status === 'request_completed'
                          ? 'Pending approval'
                          : order?.booking_status}
                  </Text>
                </View>
              </View>
            </View>
          </NeomorphBox>
        </View>

        <View style={styles.headerContainer}>
          <NeomorphBox
            style={{
              width: width / 1.1,
              height: 100,
              marginBottom: 5,
            }}>
            <View
              style={{
                flex: 1,
                padding: 15,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.heading}>Address</Text>
                <View style={styles.row}>
                  <Ionicons
                    name="ios-location-sharp"
                    size={25}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.Regular,
                      marginLeft: 5,
                      fontSize: 15,
                    }}>
                    {order?.booking_address}
                  </Text>
                </View>
              </View>
            </View>
          </NeomorphBox>
        </View>
        <View style={styles.headerContainer}>
          <NeomorphBox
            style={{
              width: width / 1.1,
              height: 100,
              marginBottom: 5,
            }}>
            <View
              style={{
                flex: 1,
                padding: 15,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.heading}>Booking Time</Text>
                <View style={styles.row}>
                  <MaterialCommunityIcons
                    name="calendar-check"
                    size={25}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.Regular,
                      marginLeft: 5,
                      fontSize: 15,
                    }}>
                    {order?.booking_date} - {order?.booking_time}
                  </Text>
                </View>
              </View>
            </View>
          </NeomorphBox>
        </View>
        {order?.booking_note ? (
          <View style={styles.headerContainer}>
            <NeomorphBox
              style={{
                width: width / 1.1,
                height: 100,
                marginBottom: 5,
                // padding: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  padding: 15,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.heading}>Notes</Text>
                  <View style={styles.row}>
                    <MaterialCommunityIcons
                      name="note-text-outline"
                      size={25}
                      color={colors.primary}
                    />
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: fonts.Regular,
                        marginLeft: 5,
                        fontSize: 15,
                      }}>
                      {order?.booking_note}
                    </Text>
                  </View>
                </View>
              </View>
            </NeomorphBox>
          </View>
        ) : null}
        <View style={styles.headerContainer}>
          <NeomorphBox
            style={{
              width: width / 1.1,
              height:
                150 *
                (offeredServices.length > 2 ? offeredServices.length / 2 : 1),
              marginBottom: 5,
              // padding: 10,
            }}>
            <View
              style={{
                flex: 1,
                padding: 15,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.heading}>Payment Summary</Text>
                {order?.subservices_charges?.map(
                  (item: ISubService, index: number) => {
                    return (
                      <View key={`sub-service${index}`}>
                        <View style={styles.serviceContainer}>
                          <View style={styles.serviceContent}>
                            <Text style={styles.serviceText}>
                              {item.subservice_name}
                            </Text>
                            <Text style={styles.serviceValue}>
                              ${item.service_charges}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  },
                )}
                {/* <View style={styles.row}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fonts.Regular,
                      marginLeft: 5,
                    }}>
                    Nothing special
                  </Text>
                </View> */}
                <View
                  style={{
                    borderTopWidth: 2,
                    borderTopColor: colors.black,
                    marginVertical: 3,
                  }}
                />
                <View
                  style={[
                    styles.row,
                    {
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <Text style={styles.serviceText}>Total</Text>
                  <Text style={styles.serviceValue}>${total}</Text>
                </View>
              </View>
            </View>
          </NeomorphBox>
        </View>
        {/* {offeredServices.map((item: ISubService) => {
          return (
            <Card key={`${item.service_title}`}>
              <View style={styles.serviceContainer}>
                <Dot />
                <View style={styles.serviceContent}>
                  <Text style={styles.serviceText}>{item.service_title}</Text>
                  <Text
                    style={[
                      styles.serviceText,
                      {
                        fontFamily: 'Segoe UI Semibold',
                      },
                    ]}>
                    $ {item.service_charges}
                  </Text>
                </View>
              </View>
            </Card>
          );
        })} */}
        {/* <View style={styles.addressContainer}>
          <Text style={styles.heading}>Service date and time</Text>
          <Card style={styles.address}>
            {isDate ? (
              <Text style={styles.addressText}>
                {moment(date).format('lll')}
              </Text>
            ) : (
              <Text style={styles.addressText}>{order?.order_date}</Text>
            )}
          </Card>
        </View> */}
        {/* <View style={styles.addressContainer}>
          <Text style={styles.heading}>Location</Text>
          <Card style={styles.addressHeading}>
            <Text style={styles.heading}>Office</Text>
          </Card>
          <Card style={styles.address}>
            <Text style={styles.addressText}>{order?.address}</Text>
          </Card>
        </View> */}

        {!isUser &&
          ratings.map((item, index) => (
            <View style={{ margin: 20 }}>
              <Review
                key={`review-${index}`}
                name={item.name}
                image={item.image}
                date={item.date}
                rate={item.rate}
                review={item.review}
                review_id={item.review_id}
              />
            </View>
          ))}
        <View style={styles.buttonContainer}>
          {!isUser && (
            <>
              {order?.booking_status === 'pending' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => _updateOrderStatus('accepted')}
                    style={{ marginVertical: 15, width: '45%' }}
                    title={'Accept'}
                  />
                  <Button
                    titleStyle={{ fontSize: 14 }}
                    inverted
                    onPress={() => _updateOrderStatus('cancelled')}
                    style={{ marginVertical: 15, width: '45%' }}
                    title={'Reject'}
                  />
                </View>
              ) : order?.booking_status === 'accepted' ? (
                <Button
                  onPress={() => _updateOrderStatus('on_the_way')}
                  style={{ marginVertical: 15 }}
                  title={'On the way'}
                />
              ) : order?.booking_status === 'on_the_way' ? (
                <Button
                  onPress={() => _updateOrderStatus('arrived')}
                  style={{ marginVertical: 15 }}
                  title={'Arrived'}
                />
              ) : order?.booking_status === 'arrived' ? (
                <Button
                  onPress={() => _updateOrderStatus('progress')}
                  style={{ marginVertical: 15 }}
                  title={'Work in progress'}
                />
              ) : order?.booking_status === 'progress' ? (
                <Button
                  onPress={() => _updateOrderStatus('request_completed')}
                  style={{ marginVertical: 15 }}
                  title={'Mark as completed'}
                />
              ) : order?.booking_status === 'completed' ? (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Text style={{ fontSize: 16, fontFamily: fonts.Medium }}>
                    Wating for customer approval
                  </Text> */}
                </View>
              ) : null}
            </>
          )}
          {/* {!order?.rejected && (
            <Button
              onPress={() => {
                let guestData = {};
                isUser
                  ? (guestData = {
                      name: `${orderTo?.first_name} ${orderTo?.last_name}`,
                      email: orderTo?.email,
                      image: orderTo?.image,
                      fcm_token: orderTo?.fcm_token,
                    })
                  : (guestData = {
                      name: `${orderBy?.first_name} ${orderBy?.last_name}`,
                      email: orderBy?.email,
                      image: orderBy?.image,
                      fcm_token: orderBy?.fcm_token,
                    });
                navigation.navigate('Chat', {guestData});
              }}
              style={{marginVertical: 15}}
              title={isUser ? 'Chat with Service Provider' : 'Chat with Buyer'}
            />
          )} */}
          {/* {!order?.rejected && (
            <>
              {isUser ? (
                <>
                  {order?.current_status !== 'completed' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Button
                        inverted
                        onPress={() => showDatePicker()}
                        style={{marginBottom: 15, width: '45%'}}
                        title="Reschedule"
                        titleStyle={{fontSize: 16, fontFamily: 'Segoe UI'}}
                      />
                      <Button
                        inverted
                        onPress={() => setIsCancelled(true)}
                        style={{
                          marginBottom: 15,
                          width: '45%',
                          borderColor: colors.white,
                        }}
                        titleStyle={{
                          color: colors.white,
                          fontSize: 16,
                          fontFamily: 'Segoe UI',
                        }}
                        title="Cancel Order"
                      />
                    </View>
                  ) : (
                    <Button
                      inverted
                      onPress={() => navigation.navigate('Rating', {order})}
                      style={{marginBottom: 15}}
                      title="Mark Completed"
                    />
                  )}
                </>
              ) : order?.current_status !== 'completed' ? (
                <Button
                  inverted
                  onPress={() =>
                    navigation.navigate('OrderStatus', {
                      id,
                      name: `${orderBy?.first_name} ${orderBy?.last_name}`,
                      order,
                    })
                  }
                  style={{marginBottom: 15}}
                  title="Update Status"
                />
              ) : null}
            </>
          )} */}
          {
            <>
              {isUser ? (
                <>
                  {order?.booking_status === 'pending' ||
                    order?.booking_status === 'accepted' ? (
                    <Button onPress={_cancelOrder} title="Cancel Booking" />
                  ) : order?.booking_status === 'request_completed' ? (
                    <Button
                      onPress={() => _updateUserOrderStatus('completed')}
                      title="Approve completed work"
                    />
                  ) : null}
                  {/* (
                    <Button
                      inverted
                      onPress={() => navigation.navigate('Rating', {order})}
                      style={{marginBottom: 15}}
                      title="Mark Completed"
                    />
                  ) */}
                </>
              ) : null}
              {/* order?.current_status !== 'completed' ? (
                <Button
                  inverted
                  onPress={() =>
                    navigation.navigate('OrderStatus', {
                      id,
                      // name: `${orderBy?.first_name} ${orderBy?.last_name}`,
                      order,
                    })
                  }
                  style={{marginBottom: 15}}
                  title="Update Status"
                />
              ) : */}
            </>
          }
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
      <Modal
        style={{ margin: 0 }}
        isVisible={isCancelled}
        onBackButtonPress={() => {
          setIsCancelled(false);
        }}
        onBackdropPress={() => {
          setIsCancelled(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Pressable
              onPress={() => setIsCancelled(false)}
              style={styles.cross}>
              <Image
                style={styles.crossIcon}
                source={require('@App/images/cancel.png')}
              />
            </Pressable>

            <View style={styles.modalHeader}>
              <Text style={styles.heading}>Cancelling service order</Text>
            </View>
            <View style={styles.questions}>
              <View style={styles.questionContainer}>
                <Radio
                  checked={checked == 'long' ? true : false}
                  onCheck={() => setChecked('long')}
                />
                <Text style={[styles.text, { flex: 1 }]}>
                  Service is taking too long to be arrived
                </Text>
              </View>
              <View style={styles.questionContainer}>
                <Radio
                  checked={checked == 'discovered' ? true : false}
                  onCheck={() => setChecked('discovered')}
                />
                <Text style={[styles.text, { flex: 1 }]}>
                  Customer discovered same service on another app or a shop at a
                  lower price than the order price.
                </Text>
              </View>
              <View style={styles.questionContainer}>
                <Radio
                  checked={checked == 'anotherservice' ? true : false}
                  onCheck={() => setChecked('anotherservice')}
                />
                <Text style={[styles.text, { flex: 1 }]}>
                  Customer changes his mind and opts for another service instead
                </Text>
              </View>
              <View style={styles.questionContainer}>
                <Radio
                  checked={checked == 'others' ? true : false}
                  onCheck={() => setChecked('others')}
                />
                <Text style={styles.text}>Other reasons</Text>
              </View>
            </View>
            <Button
              style={{ width: 200, alignSelf: 'center', marginBottom: 15 }}
              title="Done"
              onPress={_cancelOrder}
            />
          </View>
        </View>
      </Modal>
    </Container>
  );
}
