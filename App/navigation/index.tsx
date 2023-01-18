import React, { Fragment } from 'react';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import { useAppSelector } from '@App/hooks';
import {
  AboutUsScreen,
  AddServiceScreen,
  BecomeMember,
  BookingDetailsScreen,
  BookNowScreen,
  ChangePasswordScreen,
  ChatScreen,
  ChoseServiceHours,
  ChoseServiceScreen,
  ConfirmBookingScreen,
  EditProfileScreen,
  EditServiceScreen,
  HelpCenterDetailsScreen,
  HelpCenterSceen,
  MyServicesScreen,
  MyWalletScreen,
  OrderStatusScreen,
  PaymentScreen,
  PopularServiceScreen,
  ProviderDetailsScreen,
  ProviderProfileScreen,
  ProvidersFromService,
  RatingScreen,
  SearchProvidersScreen,
  ShowAllReviewsScreen,
  SubServicesListScreen,
  TransactionHistoryScreen,

} from '@App/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { navigationRef } from './navigationService';
import { AuthStackNavigator } from './stacks';
import { ServiceProviderTabs, UserTabs } from './tabs';
import SignUpScreen from '@App/screens/Auth/SignUpScreen';

const Stack = createStackNavigator();

const HeaderOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.primary },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  headerBackTitleVisible: false,
  headerBackTitle: ' ',
};

export default function RootNavigator() {
  const { user } = useAppSelector(({ USER }) => USER);

  console.log(user)

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!user ? (
          <>
            <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
          </>
        ) : (
          <>
            {user.type === 'Service Provider' ? (
              user.sub_services.filter((item: any) => item.is_selected === true)
                .length ? (!user.subscription_status && !user.subscription_trial ? (

                  user.stripe_status != true ?
                    <Stack.Screen
                      options={{
                        ...HeaderOptions,
                        headerTitle: 'Become a member',
                        headerTitleAlign: 'center',
                      }}
                      name="BecomeMember"
                      component={BecomeMember}
                    />
                    : null

                ) : null
              ) : (
                <Stack.Screen
                  options={{
                    ...HeaderOptions,
                    headerTitle: 'Add Service',
                    headerTitleAlign: 'center',
                  }}
                  name="AddService"
                  component={AddServiceScreen}
                />
              )
            ) : (
              <Stack.Screen
                options={{
                  headerBackTitleVisible: false,
                  headerBackTitle: ' ',
                }}
                name="UserTabs"
                component={UserTabs}
              />
            )}
            <Stack.Screen
              name="ServiceProviderTabs"
              component={ServiceProviderTabs}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'My Services',
                headerTitleAlign: 'center',
              }}
              name="MyServices"
              component={MyServicesScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Search',
                headerTitleAlign: 'center',
              }}
              name="SearchProviders"
              component={SearchProvidersScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Services',
                headerTitleAlign: 'center',
              }}
              name="SubServicesList"
              component={SubServicesListScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Profile',
                headerTitleAlign: 'center',
              }}
              name="ProviderProfile"
              component={ProviderProfileScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Edit Profile',
                headerTitleAlign: 'center',
              }}
              name="EditProfile"
              component={EditProfileScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Popular Services',
                headerTitleAlign: 'center',
              }}
              name="PopularServices"
              component={PopularServiceScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Change Password',
                headerTitleAlign: 'center',
              }}
              name="ChangePassword"
              component={ChangePasswordScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Edit Services',
                headerTitleAlign: 'center',
              }}
              name="EditService"
              component={EditServiceScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Confirm Booking',
                headerTitleAlign: 'center',
              }}
              name="ConfirmBooking"
              component={ConfirmBookingScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Booking Detail',
                headerTitleAlign: 'center',
              }}
              name="BookingDetails"
              component={BookingDetailsScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Order Status',
                headerTitleAlign: 'center',
              }}
              name="OrderStatus"
              component={OrderStatusScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitleAlign: 'center',
              }}
              name="Chat"
              component={ChatScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: `Provider's Profile`,
                headerTitleAlign: 'center',
              }}
              name="ProvidersFromService"
              component={ProvidersFromService}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: `Provider's Profile`,
                headerTitleAlign: 'center',
              }}
              name="ProviderDetails"
              component={ProviderDetailsScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Booking Now',
                headerTitleAlign: 'center',
              }}
              name="BookNow"
              component={BookNowScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'House Cleaning',
                headerTitleAlign: 'center',
              }}
              name="ChoseService"
              component={ChoseServiceScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'House Cleaning',
                headerTitleAlign: 'center',
              }}
              name="ChoseServiceHours"
              component={ChoseServiceHours}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Payment',
                headerTitleAlign: 'center',
              }}
              name="Payment"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Service Help Center',
                headerTitleAlign: 'center',
              }}
              name="HelpCenter"
              component={HelpCenterSceen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Help Center',
                headerTitleAlign: 'center',
              }}
              name="HelpCenterDetails"
              component={HelpCenterDetailsScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Reviews',
                headerTitleAlign: 'center',
              }}
              name="ShowAllReviews"
              component={ShowAllReviewsScreen}
            />

            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'About Us',
                headerTitleAlign: 'center',
              }}
              name="AboutUs"
              component={AboutUsScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Feedback',
                headerTitleAlign: 'center',
              }}
              name="Rating"
              component={RatingScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'My Funds',
                headerTitleAlign: 'center',
              }}
              name="MyWallet"
              component={MyWalletScreen}
            />
            <Stack.Screen
              options={{
                ...HeaderOptions,
                headerTitle: 'Transactions',
                headerTitleAlign: 'center',
              }}
              name="TransactionHistory"
              component={TransactionHistoryScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
