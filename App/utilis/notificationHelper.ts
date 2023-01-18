import {updateFcmToken} from '@App/utilis/APIs';
import messaging from '@react-native-firebase/messaging';
import { userFcmToken,userLoggedOut } from '@App/redux/actions';
import { store } from '@App/redux/config';


const dispatch = store.dispatch;

const _updateFcmToken = async (fcm_token: string) => {
  try {
    const data = new FormData();
    data.append('fcm_token', fcm_token);
    await updateFcmToken(data).then((respon)=>{
      if(respon.status==="success"){
        userFcmToken(fcm_token)(dispatch)
      }
    });
  } catch (error) {
    if(error.response.data.message === "User Not found"){
      userLoggedOut(null)(dispatch)
    }
  }
};

const _getToken = async () => {
  let fcmToken = await messaging().getToken();
  _updateFcmToken(fcmToken);
  messaging().onTokenRefresh(token => {
    _updateFcmToken(token);
  });
};

export {_getToken};
