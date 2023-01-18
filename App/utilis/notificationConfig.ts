import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

import {navigate} from '@App/navigation/navigationService';

const PushNotificationConfig = {
  configrations: () => {
    PushNotification.configure({
      onRegister: function (token) {},

      onNotification: function (notification) {
        const clicked = notification.userInteraction;
        const {data} = notification;
        if (clicked) {
          if (
            data.type === 'order_on_the_way' ||
            data.type === 'order_accepted' ||
            data.type === 'order_completed'
          ) {
            navigate('BookingDetails', {
              id: data.order_id,
              isUser: true,
            });
          } else if (
            data.type === 'order_placed' ||
            data.type === 'order_acanceled' ||
            data.type === 'rating'
          ) {
            navigate('BookingDetails', {
              id: data.order_id,
              isUser: false,
            });
          } else if (data.type === 'message') {
            navigate('Chat', {guestData: JSON.parse(data.guestData)});
          }
        }

        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {},

      onRegistrationError: function (err) {},

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  },
};

export default PushNotificationConfig;
