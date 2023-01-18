import React, { useEffect } from 'react';
import { Image, Platform, StatusBar } from 'react-native';
import PushNotification from 'react-native-push-notification';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import { StripeProvider } from '@stripe/stripe-react-native';

import { persistor, store } from '@App/redux';
import { setMainServices, setMyMainServices } from '@App/redux/actions';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';

import { Container } from './components';
import colors from './constants/colors';
import RootNavigator from './navigation';
import { getMainServices } from './utilis/APIs';
import { IMainService } from './utilis/types';
import { _getToken } from './utilis/notificationHelper';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    _getMainServices();
    _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    _getToken()
    return unsubscribe;
  }, []);

  const dispatch = store.dispatch;

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => { },
    );
  };

  const _getMainServices = async () => {
    try {
      const res = await getMainServices();
      if (res && res.status === 'success') {
        setMainServices(res.main_service_list)(dispatch);

        const newMainServices = res.main_service_list.map(
          (mainService: IMainService) => {
            const newService = {
              label: mainService.title,
              value: mainService.title.toLowerCase().replace(/\s/g, ''),
              icon: () => (
                <Image
                  resizeMode="contain"
                  source={{ uri: mainService.icon }}
                  style={{
                    width: 70,
                    height: 70,
                    tintColor: colors.black,
                  }}
                />
              ),
            };
            return newService;
          },
        );
        setMyMainServices(newMainServices)(dispatch);
      }
    } catch (err) { }
  };
  // cheetah live publishableKey="pk_live_51LViT6HKMFtTifkTXgAeOklEO2QamwTf2WmJYlkf1dkYmI4jDjhheUqnizm46YfclSBctHJxBCXfLqrbzF4lYJDc00DLJWYKId"
  //clean me test key:"pk_test_51JaHo2CNtWmc51CZZqsJaHlN1SjKkAq1ej9pAVTmMyrVi3eKuIvPoCdrpmlY8msZjjGl5C0jTyA4wqwGupR3Sf2Z00FJT85ne5"
  //pk_test_51LcpECAy6XZdMRHz8HVWqRA1YsIAHsgZjo0nY5Cp2rTXipuEZdkznCaPIGcLFhdO1rx4X0zt1psQPq3sh0rYbcvf000IVzRttI
//cp live  pk_live_51LRQg1DTz8A2Z7e78eCPnHFwP62DyifO76PbogAoE9qpdW0qLMKurn0NpHtiaeRy2BaV9jgeKIU7LT6AsowI9pFn00EWPJAqqw
  return (
    // <StripeProvider publishableKey="pk_live_51LcpECAy6XZdMRHze00V0G1CWTZmZ2q7M2WkOFjszoBYJrEmvzJEp1aKMBzwmDSJTyTye5WNdBEO6Xi1sWj1Ie8m00atqQJjSZ">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
            <RootNavigator />
          </Container>
        </PersistGate>
      </Provider>
    // {/* </StripeProvider> */}
  );
}
