import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import PushNotificationConfig from '@App/utilis/notificationConfig';
import App from './App/app';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {});
PushNotificationConfig.configrations();

AppRegistry.registerComponent(appName, () => App);
