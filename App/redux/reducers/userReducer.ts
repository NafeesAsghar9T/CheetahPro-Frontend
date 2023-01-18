import {
  USER_LOGGED_IN,
  USER_TOKEN,
  USER_LOGGED_OUT,
  USER_FCM_TOKEN,
  PROVIDER_SIGNUP,
} from '../actionTypes';

const initialState = {
  user: null,
  fcm_token: "",
  token: null,
  prvider: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case USER_LOGGED_IN: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_TOKEN: {
      return {
        ...state,
        token: action.payload,
      };
    }
    case PROVIDER_SIGNUP: {
      return {
        ...state,
        prvider: action.payload,
      };
    }
    case USER_LOGGED_OUT: {
      return initialState;
    }
    case USER_FCM_TOKEN: {
      return {
        ...state,
        fcm_token: action.payload,
      };
    }
    default:
      return state;
  }
};
