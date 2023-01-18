import React from 'react';
import {Image, Pressable} from 'react-native';

import colors from '@App/constants/colors';
import {
  CodeVerificationScreen,
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  SignUpScreen,
} from '@App/screens';
import {createStackNavigator} from '@react-navigation/stack';
import fonts from '@App/constants/fonts';
import {useAppSelector} from '@App/hooks';
const Stack = createStackNavigator();

export default function AuthStackNavigator() {
  const {prvider} = useAppSelector(({USER}) => USER);

  const HeaderOptions = {
    headerShown: true,
    headerStyle: {backgroundColor: colors.primary},
    headerTintColor: colors.accent,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontSize: 18,
      fontFamily: fonts.SemiBold,
    },
    headerLeft: props => {
      return (
        <Pressable
          style={{
            marginLeft: 15,
            height: 30,
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.onPress}>
          <Image
            style={{
              width: 17,
              height: 17,
              tintColor: colors.white,
            }}
            source={require('@App/images/arrow-back.png')}
          />
        </Pressable>
      );
    },
    headerBackTitle: '',
  };

  return (
    <Stack.Navigator
      initialRouteName={prvider != 'pro' ? 'Login' : 'SignUp'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        options={{...HeaderOptions, headerTitle: 'Forgot Password'}}
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        options={{...HeaderOptions, headerTitle: 'Code Verification'}}
        name="CodeVerification"
        component={CodeVerificationScreen}
      />
      <Stack.Screen
        options={{...HeaderOptions, headerTitle: 'Reset Password'}}
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
