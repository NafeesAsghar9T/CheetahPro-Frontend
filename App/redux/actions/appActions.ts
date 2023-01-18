import {Dispatch} from 'redux';
import {
  RESET_PASS_EMAIL,
  CODE_VALUE,
  PRODUCT,
  PLACE_ORDER,
  IS_BUSINESS,
  SET_MAIN_SERVICES,
  SET_MY_MAIN_SERVICES,
  SET_PROVIDER_BOOKINGS_LIST,
} from '../actionTypes';

const setResetPassEmail = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_PASS_EMAIL,
    payload,
  });
};

const setCodeValue = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: CODE_VALUE,
    payload,
  });
};

const setProduct = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: PRODUCT,
    payload,
  });
};

const setPlaceOrder = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: PLACE_ORDER,
    payload,
  });
};

const setIsBusiness = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: IS_BUSINESS,
    payload,
  });
};

const setMainServices = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MAIN_SERVICES,
    payload,
  });
};

const setMyMainServices = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MY_MAIN_SERVICES,
    payload,
  });
};

const setProviderBookingsList = (payload: any) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_PROVIDER_BOOKINGS_LIST,
    payload,
  });
};

export {
  setResetPassEmail,
  setCodeValue,
  setProduct,
  setPlaceOrder,
  setIsBusiness,
  setMainServices,
  setMyMainServices,
  setProviderBookingsList,
};
