import {
  ImageSourcePropType,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {store} from '@App/redux';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RootStackParamList = {
  ProvidersFromService: {title: string; id: number};
  ProviderDetails: {id: number};
  ChoseService: {offeredServices: ISubService[]; provider_id: number};
  ChoseServiceHours: {
    selectedServices: ISubService[];
    charges: number;
    provider_id: number;
  };
  BookNow: {
    selectedServices: ISubService[];
    charges: number;
    provider: IProvider;
  };
  ConfirmBooking: {
    selectedServices: ISubService[];
    charges: number;
    provider: IProvider;
    bookingDetails: {
      date: Date;
      isToday: boolean;
      isSchedule: boolean;
      note: string;
      address: string;
    };
  };
  BookingDetails: {
    isUser: boolean;
    id: number;
  };
  OrderStatus: {
    id: number;
    name: string;
    order: OrderDetail;
  };
  ChatScreen: {
    guestData: GuestData;
  };
  Rating: {
    provider: OrderUSer;
    main_service_name: string;
  };
  ShowAllReviews: {
    providerId: number;
  };
  SubServicesList: {
    id: number;
  };
};

export interface IMainService {
  id: number;
  title: string;
  image?: string;
  cat?: boolean;
  icon?: string;
  height: number;
  width: number;
  style?: ViewStyle;
  isPopular?: boolean;
  bg_color?: string;
  NeomorphBoxStyle?: ViewStyle;
}

export interface ISubService {
  id: number;
  title: string;
  is_selected?: boolean;
  service_charges?: string;
  service_title?: string;
  sub_service_id?: number;
  total_provider?: number;
  image?: string;
  subservice_name?: string;
  bg_color?: string;
}

export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  main_service_id: number;
  about: string;
  post_code: number;
  email: string;
  contactno: number;
  address: string;
  type: string;
  fcm_token: string;
}

export interface IProvider {
  user_id: number;
  name: string;
  image?: string;
  about: string;
  rate: number;
  charges: number;
  contactno?: number;
  address?: string;
  email?: string;
  fcm_token?: string;
  sub_service?: [];
  reviews?: IReviewProps[];
  isHome?: boolean;
  main_service?: string;
  order_count?: string;
  subservice?: ISubService[];
}

export interface InputProps extends TextInputProps {
  style?: ViewStyle;
  textInputStyle?: TextInputProps;
  error?: boolean;
  rightIcon?: ImageSourcePropType;
  inverted?: boolean;
}

export interface IButtonProps {
  style?: ViewStyle;
  title: string;
  onPress: () => void;
  icon?: boolean;
  inverted?: boolean;
  titleStyle?: TextStyle;
}

export interface IRadioButton {
  checked: boolean;
  label: string;
  onCheck: () => void;
  style?: ViewStyle;
  error?: boolean;
}
export type Error = {
  email?: string[];
  first_name?: string[];
  password?: string[];
  phoneno?: string[];
  old_password?: string[];
};

export interface IGradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
  viewStyle?: ViewStyle;
}
export interface IOrderProps {
  booking_id: number;
  order?: IOrderProps;
  style?: ViewStyle;
  main_service_image?: string;
  current_status: string;
  price: number;
  completed?: boolean;
  isUser?: boolean;
  provider_name?: string;
  user_name?: string;
  main_service_name?: string;
  booking_date?: string;
  booking_time?: string;
  booking_status: string;
  subservices_charges?: ISubService[];
  user_data?: OrderUSer;
  provider_data?: OrderUSer;
  booking_address?: string;
  booking_note?: string;
  booking_charge?: number;
  bg_color?: string;
  main_service_icon?: string;
  isNew?: boolean;
}

export interface ICardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export type OrderDetail = {
  current_status: string;
  amount: string;
  booking_address: string;
  new?: boolean;
  accepted?: boolean;
  completed?: boolean;
  on_the_way?: boolean;
  rejected?: boolean;
  order_date?: string;
  provider_id?: string;
  id?: number;
};

export type OrderUSer = {
  id: number;
  name: string;
  contactno: number;
  image: string;
};

export interface INotificationProps {
  id: number;
  image: string;
  name: string;
  message: string;
  status: boolean;
  onNotificationClick: () => void;
  order_id?: number;
  type?: string;
}

export interface IReviewProps {
  image: string;
  name: string;
  date: string;
  rate: number;
  review: string;
  review_id: number;
}

export type AndroidMode = 'date' | 'time';

export interface NeomorphismElementProps {
  height: number;
  width: number;
  borderRadius: number;
  containerStyle: ViewStyle;
  color: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  inset?: boolean;
}

export interface IBottomSheetModal {
  isVisible: boolean;
  onClose: () => void;
  heading: string;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  loader?: boolean;
}

export interface IMembershipPackageProps {
  title: string;
  price: string;
  plan_duration: string;
  sub_title?: string;
  isSelected: boolean;
  stripe_plan?: string;
  duration?: number;
  onPress: () => void;
}

export type GuestData = {
  name: string;
  email: string;
  fcm_token: string;
  image: string;
};

export type ChatListProps = {
  latestMessage: string;
  counter: number;
  user: GuestData;
  lastMessageDate: Date;
};
