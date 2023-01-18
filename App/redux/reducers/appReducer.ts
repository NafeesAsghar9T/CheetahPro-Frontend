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
const initialState = {
  email: '',
  codeValue: '',
  product: '',
  order: '',
  isBusiness: false,
  mainServices: [],
  myMainServices: [],
  ordersList: {},
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MAIN_SERVICES: {
      return {
        ...state,
        mainServices: action.payload,
      };
    }
    case SET_MY_MAIN_SERVICES: {
      return {
        ...state,
        myMainServices: action.payload,
      };
    }
    case SET_PROVIDER_BOOKINGS_LIST: {
      return {
        ...state,
        ordersList: action.payload,
      };
    }
    case RESET_PASS_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
    }
    case CODE_VALUE: {
      return {
        ...state,
        codeValue: action.payload,
      };
    }
    case PRODUCT: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case PLACE_ORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case IS_BUSINESS: {
      return {
        ...state,
        isBusiness: action.payload,
      };
    }

    default:
      return state;
  }
};
