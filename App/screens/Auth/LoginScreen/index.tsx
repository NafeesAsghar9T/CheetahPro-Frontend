import React, {useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {
  BottomSheetModal,
  Button,
  Container,
  Input,
  Loader,
  NeomorphBox,
  NeomorphismElement,
} from '@App/components';
import colors from '@App/constants/colors';
import {useAppDispatch, useAppSelector} from '@App/hooks';
import {
  setCodeValue,
  setResetPassEmail,
  userLoggedIn,
  userToken,
} from '@App/redux/actions';
import {Form, offset} from '@App/utilis';
import {
  userComformationCode,
  userForgotPassword,
  userLogin,
  userResetPassword,
} from '@App/utilis/APIs';
import {validateEmail} from '@App/utilis/validation';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

export default function LoginScreen() {
  const {email: resetEmail, codeValue} = useAppSelector(
    ({APPSTATE}) => APPSTATE,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loader, setLoader] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [loginErr, setLoginErr] = useState('');
  const [isForgot, setIsForgot] = useState(false);
  const [forgotErr, setForgotErr] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailErr, setForgotEmailErr] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [value, setValue] = useState('');
  const [valueErr, setValueErr] = useState(false);
  const [codeErr, setCodeErr] = useState('');
  const [isReset, setIsReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordErr, setNewPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [passwordResetErr, setPasswordResetErr] = useState('');

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const _userLogin = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        const res = await userLogin(data);
        setLoader(false);

        if (res && res.status === 'success') {
          userLoggedIn(res.userdata)(dispatch);
          userToken(res.token)(dispatch);
        } else {
          setLoginErr('Something went wrong! Please try again.');
        }
      } catch (err: any) {
        setLoader(false);
        setLoginErr(err.message);
      }
    }
  };

  const _validate = () => {
    if (!validateEmail(email) && !password) {
      _loginErrStates(true);
      return false;
    } else if (!validateEmail(email)) {
      setEmailErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    }
    setLoginErr('');
    return true;
  };

  const _loginErrStates = (error: boolean) => {
    setEmailErr(error);
    setPasswordErr(error);
    setLoginErr('');
  };

  const _resetErrStates = (error: boolean) => {
    setNewPasswordErr(error);
    setConfirmPasswordErr(error);
    setPasswordResetErr('');
  };

  const _forgotErrStates = (error: boolean) => {
    setForgotEmailErr(error);
    setForgotErr('');
  };

  const _userForgotPassword = async () => {
    try {
      if (_forgotValidation(forgotEmail)) {
        setLoader(true);
        const data = new FormData();
        data.append('email', forgotEmail);
        const res = await userForgotPassword(data);
        setLoader(false);

        if (res && res.status === 'success') {
          setResetPassEmail(forgotEmail)(dispatch);
          setIsForgot(false);
          setTimeout(() => {
            setIsVerify(true);
          }, 500);
        } else {
          setForgotErr('Something went wrong! Please try again.');
        }
      }
    } catch (err: any) {
      setForgotErr(err.message);

      setLoader(false);
    }
  };

  const _forgotValidation = (email: string) => {
    if (!validateEmail(email)) {
      _forgotErrStates(true);
      return false;
    }
    return true;
  };

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const _userComformationCode = async () => {
    try {
      if (value && value.length === CELL_COUNT) {
        setLoader(true);
        const data = new FormData();
        data.append('token', value);
        const res = await userComformationCode(data);
        setLoader(false);
        if (res && res.status === 'success') {
          setCodeValue(value)(dispatch);
          setIsVerify(false);
          setTimeout(() => {
            setIsReset(true);
          }, 500);
        } else {
          if (value.length === CELL_COUNT) {
            setCodeErr('This password reset token is invalid.');
          }
          setValueErr(true);
        }
      } else {
        setValueErr(true);
      }
    } catch (err: any) {
      setLoader(false);
      setValueErr(true);
      setCodeErr(err.message);
    }
  };

  const _userResetPassword = async () => {
    if (passwordResetErr) _resetErrStates(false);
    if (_resetPasswordValidation()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('email', resetEmail);
        data.append('token', codeValue);
        data.append('password', newPassword);
        data.append('password_confirmation', confirmPassword);

        const res = await userResetPassword(data);
        setLoader(false);

        if (res && res.status === 'success') {
          setIsForgot(false);
          setIsVerify(false);
          setIsReset(false);
          // navigation.navigate('Login');
        } else {
          setPasswordResetErr('Something went wrong! Please try again.');
        }
      } catch (err: any) {
        setPasswordResetErr(err.message);
        setLoader(false);
      }
    }
  };

  const _resetPasswordValidation = () => {
    if (!newPassword && !confirmPassword) {
      setNewPasswordErr(true);
      setConfirmPasswordErr(true);
      return false;
    } else if (newPassword != confirmPassword) {
      setNewPasswordErr(true);
      setConfirmPasswordErr(true);
      return false;
    } else if (!newPassword) {
      setNewPasswordErr(true);
      return false;
    } else if (!confirmPassword) {
      setPasswordErr(true);
      return false;
    }
    return true;
  };

  return (
    <Container>
      {loader && <Loader loader={loader} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.screen}>
        <Form
          style={{flex: 1}}
          behavior="padding"
          keyboardVerticalOffset={offset.seventy}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 30,
            }}>
            <Text style={styles.heading}>Login</Text>
            <Text style={styles.subHeading}>Please login here</Text>

            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('../../../images/logo.png')}
            />
          </View>
          <View style={styles.formContainer}>
            <Input
              value={email}
              onChangeText={text => {
                setEmail(text);
                emailErr && _loginErrStates(false);
              }}
              placeholder="Email"
              error={emailErr}
            />
            <Input
              value={password}
              onChangeText={text => {
                setPassword(text);
                passwordErr && _loginErrStates(false);
              }}
              placeholder="Password"
              secureTextEntry
              error={passwordErr}
            />
            <Text onPress={() => setIsForgot(true)} style={styles.forgot}>
              Forgot Password
            </Text>
            {loginErr ? <Text style={styles.error}>{loginErr}</Text> : null}
          </View>
          <View style={styles.btnContainer}>
            <Button onPress={_userLogin} title="Login" />
            <View style={styles.accountContainer}>
              <Text style={styles.text}>Don't have an account?</Text>
              <Text
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signUp}>
                Sign Up
              </Text>
            </View>
          </View>
        </Form>
      </ScrollView>
      <BottomSheetModal
        heading="Forgot Password"
        isVisible={isForgot}
        onClose={() => setIsForgot(false)}
        loader={loader}>
        <View style={{flex: 1}}>
          <View style={[styles.center, {marginTop: 20}]}>
            <Text style={styles.description}>
              Enter your email to verify your account. We will send a 4 digits
              code to your email.
            </Text>
          </View>
          <View style={[styles.center, {bottom: 15}]}>
            <Input
              value={forgotEmail}
              onChangeText={text => {
                setForgotEmail(text);
                forgotEmailErr && _forgotErrStates(false);
              }}
              placeholder="Email"
              error={forgotEmailErr}
            />
            {forgotErr ? <Text style={styles.error}>{forgotErr}</Text> : null}
          </View>
          <View style={styles.footer}>
            <Button title="Send" onPress={_userForgotPassword} />
          </View>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        heading="Forgot Password"
        isVisible={isVerify}
        onClose={() => setIsVerify(false)}
        loader={loader}>
        <View style={{flex: 1}}>
          <View style={[styles.center, {marginTop: 20}]}>
            <Text style={styles.description}>
              Enter 4 digits code that you received on your email.
            </Text>
          </View>
          <View style={[styles.center]}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={(text: string) => {
                setValueErr(false);
                setCodeErr('');
                setValue(text);
              }}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View onLayout={getCellOnLayoutHandler(index)} key={index}>
                  <NeomorphBox
                    style={{
                      width: 55,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={[
                        styles.cellText,
                        {color: valueErr ? colors.red : colors.black},
                      ]}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </NeomorphBox>
                </View>
              )}
            />
            {codeErr ? <Text style={styles.error}>{codeErr}</Text> : null}
          </View>
          <View style={styles.footer}>
            <Button title="Verify" onPress={_userComformationCode} />
          </View>
        </View>
      </BottomSheetModal>
      <BottomSheetModal
        heading="Forgot Password"
        isVisible={isReset}
        onClose={() => setIsReset(false)}
        loader={loader}>
        <View style={{flex: 1}}>
          <View style={[styles.center, {marginTop: 20}]}>
            <Text style={styles.description}>
              Please enter your new password.
            </Text>
          </View>
          <View style={styles.center}>
            <Input
              value={newPassword}
              onChangeText={text => {
                setNewPassword(text);
                newPasswordErr && _resetErrStates(false);
              }}
              placeholder="New Password"
              secureTextEntry
              error={newPasswordErr}
            />
            <Input
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                confirmPasswordErr && _resetErrStates(false);
              }}
              placeholder="Confirm New Password"
              secureTextEntry
              error={confirmPasswordErr}
            />
            <View style={{height: 30}}>
              {passwordResetErr ? (
                <Text style={styles.error}>{passwordResetErr}</Text>
              ) : null}
            </View>
          </View>
          <View style={styles.footer}>
            <Button title="Update" onPress={_userResetPassword} />
          </View>
        </View>
      </BottomSheetModal>
    </Container>
  );
}
