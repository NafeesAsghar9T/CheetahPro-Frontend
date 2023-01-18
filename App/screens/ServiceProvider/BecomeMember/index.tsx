import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { WebView } from 'react-native-webview';

import {
  Button,
  Container,
  Loader,
  MembershipPackage,
  PaymentView,
} from '@App/components';
import {useAppDispatch, useAppSelector} from '@App/hooks';
import {userLoggedIn,userLoggedOut} from '@App/redux/actions';
// import {
//   createPayment,
//   getMembershipPackages,
//   startTrial,
// } from '@App/utilis/APIs';
import {
  checkStripeStatus,
  createStripeCustomer,
  providerOrdersList,
  startTrial,
  getMembershipPackages,
  createPayment
} from '@App/utilis/APIs';
import {IMembershipPackageProps} from '@App/utilis/types';
import { _getToken } from '@App/utilis/notificationHelper';
import styles from './styles';

export default function BecomeMember({navigation}) {
  const {user} = useAppSelector(({USER}) => USER);

  const [idx, setIdx] = useState(0);
  const [loader, setLoader] = useState(false);
  const [plans, setPlans] = useState<IMembershipPackageProps[]>([]);
  const [pay, setPay] = useState(false);
  const [item, setItem] = useState<IMembershipPackageProps>();
  const [isVisible, setIsVisible] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [stripeAccountUrl, setStripeAccountUrl] = useState('');

  console.log("stripeAccountUrl",stripeAccountUrl)
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   _getToken();
  //   _createStripeCustomer();
  // }, []);

  // const _checkStripeStatus = async () => {
  //   try {
  //     const res = await checkStripeStatus();
  //     console.log("rressssss+++++++++",res)
  //     if (res.status === 'success') {
  //       userLoggedIn({ ...user, stripe_status: res.stripe_status })(dispatch);
  //       navigation.navigate('ServiceProviderTabs');
  //     }
  //   } catch (error) { 
  //     console.log("errrrrr}}}}}}}}}}}",error)
  //   }
  // };

  // const _createStripeCustomer = async () => {
  //   try {
  //     setLoader(true);
  //     const res = await createStripeCustomer();
  //     console.log("resss",res)
  //     setLoader(false);
  //     if (res && res.status === 'success') {
  //       console.log("Create express Result",res)
  //       // _stripeAccountLink();
  //       setStripeAccountUrl(res.account_link.url);
  //     }
  //   } catch (error) {
  //     console.log("rerrrrerre{{{",error.response)
  //     setLoader(false);
  //   }
  // };
//.......................Subscription base payment.....////
  useEffect(() => {
    _getMembershipPackages();
  }, []);
 
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus === 'Payment Success') {
        setTimeout(() => {
          setIsVisible(false);
          setPay(false);

          setPaymentStatus('');
        }, 2000);
      } else if (paymentStatus === 'Payment failed due to some issue') {
        setTimeout(() => {
          setIsVisible(false);
          setPay(false);
          setPaymentStatus('');
        }, 2000);
      }
    }
  }, [paymentStatus]);

  const _getMembershipPackages = async () => {
    try {
      setLoader(true);
      const res = await getMembershipPackages();
      setLoader(false);
      if (res && res.status === 'success') {
        setPlans(res.data);
        setItem(res.data[0]);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const _startTrial = async () => {
    try {
      const data = new FormData();
      data.append('user_id', user?.id);
      setLoader(true);
      const res = await startTrial(data);
      setLoader(false);
      if (res && res.status === 'success') {
        userLoggedIn(res.Data)(dispatch);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const onCheckStatus = async (paymentResponse: any) => {
    console.log('payment responce', paymentResponse);
    let response = JSON.parse(paymentResponse);
    if (!response) {
    } else if (response.error) {
    } else {
      setPaymentStatus('Please wait while confirming your payment!');
      setIsVisible(true);

      let jsonResponse = JSON.parse(paymentResponse);

      const data = new FormData();
      data.append('user_id', user.id);
      data.append('tokenId', jsonResponse.token.id);
      // data.append('stripe_plan', item?.stripe_plan);
       data.append('stripe_plan', "price_1Lx242LqDEtdlkDfAsRCOj4T");
      data.append('plan_duration', item?.plan_duration);
      data.append('duration', item?.duration);

      console.log("dataaaaa",data)

      try {
        const stripeResponse = await createPayment(data);

        if (stripeResponse) {
          console.log('Respomce Api', stripeResponse);
          const {paid} = stripeResponse;
          if (paid === true) {
            userLoggedIn(stripeResponse.data)(dispatch);
            setPaymentStatus('Payment Success');
          } else {
            setPaymentStatus('Payment failed due to some issue');
          }
        } else {
          setPaymentStatus('Payment failed due to some issue');
        }
      } catch (error) {
        setPaymentStatus('Payment failed due to some issue');
      }
    }
  };

  return (

    // Start of connecte base payment......
    // <Container>
    //  <View style={{ flex: 1}}>
    //    <WebView
    //       source={{
    //         uri: stripeAccountUrl,
    //       }}
    //       style={{flex:1}}
    //       onNavigationStateChange={e => {
    //         console.log("eeeee",e)
    //         if (e.url === 'http://www.cheetahpros.com/cheetahpros/stripe/success') {
    //          _checkStripeStatus() 
    //         } else if (e.url === 'http://www.cheetahpros.com/cheetahpros/stripe/failure') {
    //           userLoggedOut()(dispatch)
    //       }
    //       }}
          
    //       onMessage={event => {
    //         console.log('MESSAGE >>>>' + event.nativeEvent.data);
    //       }}
    //       // onMessage={e => {console.log("messagee{{{{{{{",e)}}
    //       javaScriptEnabled={true}
    //       onResponderTerminate={e => { 
    //         {console.log("messagee{{{{{{{",e)}
    //       }}
    //     />
    //   </View>
    // </Container>

    //End of  connect base Payment

//Start scubscription base payment

    <Container>
      {loader && <Loader loader={loader} />}
      <View style={{flex: 5, marginVertical: 30}}>
        <Text style={styles.description}>
          Create unlimited actions,store securely in the cloud and synced to
          your devices.
        </Text>

        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 15,
            alignItems: 'center',
          }}
          data={plans}
          renderItem={({item, index}) => (
            <MembershipPackage
              title={item.title}
              price={item.price}
              plan_duration={item.plan_duration}
              sub_title={item.sub_title}
              onPress={() => {
                setIdx(index);
                setItem(item);
              }}
              isSelected={idx === index}
            />
          )}
        />

        <Text style={[styles.text, {textAlign: 'center', marginTop: 15}]}>
          Cancel anytime. $11.99 billed yearly, automatically renews.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="Continue" onPress={() => setPay(true)} />
        <View style={{marginTop: 5}}>
          <Button
            inverted
            title='Sign up for your 7 days free trial”'
            // title="Start your 7 days trial"
            onPress={_startTrial}
          />
        </View>
      </View>
      <Modal
        isVisible={pay}
        style={{margin: 0}}
        onBackButtonPress={() => setPay(false)}>
        <View style={styles.paymentView}>
          <View style={{position: 'absolute', top: 20, left: 15, zIndex: 100}}>
            <AntDesign
              onPress={() => setPay(false)}
              name="arrowleft"
              size={25}
              color="black"
            />
          </View>
          <PaymentView onCheckStatus={onCheckStatus} paymentPackage={item} />
        </View>
      </Modal>
      <Modal
        isVisible={isVisible}
        style={{margin: 0}}
        onBackButtonPress={() => setIsVisible(false)}>
        <Loader loader={isVisible} />
        <View style={styles.errorModal}>
          <Text>{paymentStatus}</Text>
        </View>
      </Modal>
    </Container>

    //End of subscription base payment
  );
}
