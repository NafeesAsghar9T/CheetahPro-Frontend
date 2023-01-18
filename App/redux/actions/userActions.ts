import {Dispatch} from 'redux';

import {IUser} from '@App/utilis/types';

import {
  USER_FCM_TOKEN,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_TOKEN,
  PROVIDER_SIGNUP,
} from '../actionTypes';

const userLoggedIn = (payload: IUser) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGGED_IN,
    payload,
  });
};

const userToken = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_TOKEN,
    payload,
  });
};
const Provider_logout = (payload: string) => (dispatch: Dispatch) => {
  console.log('payladerrrrr', payload);
  dispatch({
    type: PROVIDER_SIGNUP,
    payload,
  });
};

const userLoggedOut = () => (dispatch: Dispatch) => {
  dispatch({
    type: USER_LOGGED_OUT,
  });
};

const userFcmToken = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: USER_FCM_TOKEN,
    payload,
  });
};

export {userLoggedIn, userToken, userLoggedOut, Provider_logout, userFcmToken};
