import axios from 'axios';
import { store } from '@App/redux';

const API = axios.create({
  baseURL:"https://www.cheetahpros.com"
});

API.interceptors.request.use(function (config) {
  const { token } = store.getState().USER;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

interface IPayload {
  data: FormData;
}

const getMainServices = async () => {
  const requrest = `/api/get-main-service`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const userLogin = async (payload: FormData) => {
  const requrest = `/api/login`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    if (err.message === 'Network Error') {
      throw new Error(err.message);
    } else {
      const { message } = err.response.data;
      throw new Error(message);
    }
  }
};

const userRegister = async (payload: FormData) => {
  console.log("api payload",payload)
  const requrest = `/api/register`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const { message } = err.response.data;
    throw message;
  }
};

const userForgotPassword = async (payload: FormData) => {
  const requrest = `/api/forgot`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const { message } = err.response.data;
    throw new Error(message);
  }
};

const userComformationCode = async (payload: FormData) => {
  const requrest = `/api/confirm-code`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const { error } = err.response.data;
    throw new Error(error);
  }
};

const userResetPassword = async (payload: FormData) => {
  const requrest = `/api/reset`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const { message } = err.response.data;
    throw new Error(message.password);
  }
};

const userChangePassword = async (payload: IPayload) => {
  const requrest = `/api/change-password`;

  try {
    const response = await API.post(requrest, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    const { message } = err.response.data;
    throw message;
  }
};

const userEditProfile = async (payload: FormData) => {
  const requrest = `/api/edit`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const userHomeServices = async () => {
  const requrest = `/api/user-home`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const searchProvidersList = async (payload: any) => {
  const requrest = `/api/view-provider-postal/${payload}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const getSubServices = async (payload: number) => {
  const requrest = `/api/get-sub-service/${payload}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};
const getMembershipPackages = async () => {
  const requrest = `/api/list-subscription-plan`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const createPayment = async (payload: FormData) => {
  const requrest = `/api/stripe-payment`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const startTrial = async (payload: FormData) => {
  const requrest = `/api/user-trial`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const addOrEditService = async (payload: FormData) => {
  const requrest = `/api/edit-provider-service`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const providersFromService = async (payload: {
  id: number;
  searchType: string;
  search: string;
}) => {
  const requrest = payload.search
    ? `/api/get-provider-by-subservice/${payload.id}/${payload.searchType}/${payload.search}`
    : `/api/get-provider-by-subservice/${payload.id}/${payload.searchType}`;

  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const getProviderProfile = async (payload: number) => {
  const requrest = `/api/view-provider-profile/${payload}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const allFcmListUser = async (payload: number) => {
  const requrest = `/api/get-all-fcm`;
  try {
    const response = await API.post(requrest,payload.listemail, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const getPopularServices = async () => {
  const requrest = `/api/get-all-popular-service`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const galleryImageUpload = async (payload: FormData) => {
  const requrest = `/api/gallery-image-upload`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const placeOrder = async (payload: FormData) => {
  const requrest = `/api/create-booking`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const userOrdersList = async () => {
  const requrest = `/api/view-booking-history`;

  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const providerOrdersList = async (isNew: boolean) => {
  const requrest = isNew
    ? `/api/provider-booking-new`
    : `/api/provider-booking-history`;

  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const orderDetails = async (payload: number) => {
  const requrest = `/api/view-booking-detail/${payload}`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const updateOrderStatus = async (payload: FormData) => {
  const requrest = `/api/provider-booking-status-update`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const updateUserOrderStatus = async (payload: FormData) => {
  const requrest = `/api/update-user-booking-status`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const cancelOrder = async (payload: FormData) => {
  const requrest = `/api/cancel-booking`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const rescheduleOrder = async (payload: FormData) => {
  const requrest = `/api/change-order-date`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const addReview = async (payload: FormData) => {
  const requrest = `/api/add-service-review`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err: any) {
    throw err;
  }
};

const updateFcmToken = async (payload: FormData) => {
  const requrest = `/api/update-fcm`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const showAllReviews = async (payload: number) => {
  const requrest = `/api/view-provider-reviews/${payload}`;

  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const getNotificationsList = async () => {
  const requrest = `/api/notification-list`;

  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const changeNotificationStatus = async (payload: FormData) => {
  const requrest = `/api/notification-status`;

  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const createPaymentIntent = async (payload: FormData) => {
  const requrest = `/api/payment-intent`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const confirmPaymentWallet = async (payload: FormData) => {
  const requrest = `/api/wallet`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const checkStripeStatus = async () => {
  const requrest = `/api/stripe-status`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const createStripeCustomer = async () => {
  const requrest = `/api/create-express`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const stripeAccountLink = async () => {
  const requrest = `/api/account-link`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const checkAccountBalance = async () => {
  const requrest = `/api/check-balance`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const withdrawAccountBalance = async (payload: FormData) => {
  const requrest = `/api/bank-transfer`;
  try {
    const response = await API.post(requrest, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const getTransactionList = async () => {
  const requrest = `/api/transaction-list`;
  try {
    const response = await API.get(requrest, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

const bankAccountsList = async () => {
  const requrest = `/api/bank-list`;
  try {
    const response = await API.post(requrest, null, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    const { data, status } = response;
    return status === 200 || status === 201 ? data : null;
  } catch (err) {
    throw err;
  }
};

export {
  getMainServices,
  userLogin,
  userRegister,
  userForgotPassword,
  userComformationCode,
  userResetPassword,
  userChangePassword,
  userEditProfile,
  providersFromService,
  galleryImageUpload,
  placeOrder,
  userOrdersList,
  providerOrdersList,
  orderDetails,
  updateOrderStatus,
  cancelOrder,
  rescheduleOrder,
  addReview,
  updateFcmToken,
  showAllReviews,
  getNotificationsList,
  changeNotificationStatus,
  createPaymentIntent,
  confirmPaymentWallet,
  checkStripeStatus,
  createStripeCustomer,
  stripeAccountLink,
  checkAccountBalance,
  withdrawAccountBalance,
  getTransactionList,
  bankAccountsList,
  userHomeServices,
  getSubServices,
  getProviderProfile,
  getPopularServices,
  updateUserOrderStatus,
  addOrEditService,
  searchProvidersList,
  getMembershipPackages,
  startTrial,
  createPayment,
  allFcmListUser,
};
