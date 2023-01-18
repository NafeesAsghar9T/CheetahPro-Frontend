import React, { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button, Container, Input, Loader, RadioButton } from '@App/components';
import colors from '@App/constants/colors';
import { useAppDispatch, useAppSelector } from '@App/hooks';
import { userLoggedIn, userToken } from '@App/redux/actions';
import { Form, offset } from '@App/utilis';
import { userRegister } from '@App/utilis/APIs';
import { isIOS } from '@App/utilis/platform';
import { Error, IMainService } from '@App/utilis/types';
import { validateEmail } from '@App/utilis/validation';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function SignUpScreen() {
  const { mainServices } = useAppSelector(({ APPSTATE }) => APPSTATE);

  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [userType, setUserType] = useState('User');
  const [agreement, setAgreement] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageErr, setImageErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [aboutErr, setAboutErr] = useState(false);
  const [streetErr, setStreetErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [stateErr, setStateErr] = useState(false);
  const [zipCodeErr, setZipCodeErr] = useState(false);
  const [agreementErr, setAgreementErr] = useState(false);
  const [userRegisterErr, setUserRegisterErr] = useState('');
  const [isMember, setIsMember] = useState(false);

  const [mainService, setMainService] = useState<IMainService | undefined>(
    undefined,
  );
  const [serviceErr, setServiceErr] = useState(false);

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { height } = useWindowDimensions();

  const _selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      imageErr && resetErrStates(false);
    });
  };

  const _userRegister = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('first_name', firstName);
        data.append('last_name', lastName);
        data.append('email', email);
        data.append('about', about);
        data.append('password', password);
        data.append('password_confirmation', confirmPassword);
        data.append('contactno', phone);
        data.append('street', street);
        data.append('city', city);
        data.append('state', state);
        data.append('post_code', zipCode);
        data.append('type', userType);
        {
          mainService ? data.append('main_service_id', mainService.id) : null;
        }
        {
          image
            ? data.append('image', {
              uri: image,
              type: 'image/jpeg',
              name: 'image' + new Date() + '.jpg',
            })
            : null;
        }

        console.log("-------->>>>>>>", data)



        const res = await userRegister(data);
        console.log("res of signup", res)
        setLoader(false);
        if (res && res.status === 'success') {
          userLoggedIn(res.userdata)(dispatch);
          userToken(res.token)(dispatch);
        } else {
          setUserRegisterErr('Something went wrong! Please try again.');
        }
      } catch (err: any) {

        console.log("errror", err)
        setLoader(false);
        errorHandler(err);
      }
    }
  };

  const resetErrStates = (error: boolean) => {
    setImageErr(error);
    setFirstNameErr(error);
    setLastNameErr(error);
    setEmailErr(error);
    setPasswordErr(error);
    setPhoneErr(error);
    // setStreetErr(error);
    // setCityErr(error);
    // setStateErr(error);
    setZipCodeErr(error);
    setAgreementErr(error);
    setUserRegisterErr('');
    setAboutErr(error);
  };

  const _validate = () => {
    if (
      // !image &&
      !firstName.trim() &&
      !lastName.trim() &&
      !validateEmail(email) &&
      !password &&
      // !about &&
      !phone &&
      // !street &&
      // !city &&
      // !state &&
      // !zipCode &&
      !agreement
    ) {
      if (userType === 'Service Provider' && !mainService) {
        setServiceErr(true);
      }
      resetErrStates(true);
      return false;
    }
    // else if (!image) {
    //   setImageErr(true);
    //   return false;
    // }
    else if (!firstName.trim()) {
      setFirstNameErr(true);
      return false;
    } else if (!lastName.trim()) {
      setLastNameErr(true);
      return false;
    } else if (!validateEmail(email)) {
      setEmailErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    }
    // else if (!about.trim()) {
    //   setAboutErr(true);
    //   return false;
    // }
    else if (!phone.trim()) {
      setPhoneErr(true);
      return false;
    }
    // else if (!street.trim()) {
    //   setStreetErr(true);
    //   return false;
    // }
    // else if (!city.trim()) {
    //   setCityErr(true);
    //   return false;
    // }
    // else if (!state.trim()) {
    //   setStateErr(true);
    //   return false;
    // }
    //  else if (!zipCode.trim()) {
    //   setZipCodeErr(true);
    //   return false;
    // }
    else if (userType === 'Service Provider' && !mainService) {
      setServiceErr(true);
      return false;
    } else if (!agreement) {
      setAgreementErr(true);
      return false;
    }
    setUserRegisterErr('');
    return true;
  };

  const errorHandler = (err: Error) => {
    const emailErr = err['email'];
    const firstNameErr = err['first_name'];
    const passwordErr = err['password'];
    const phoneErr = err['phoneno'];
    if (emailErr) {
      setUserRegisterErr(emailErr[0]);
    } else if (firstNameErr) {
      setUserRegisterErr(firstNameErr[0]);
    } else if (passwordErr) {
      setUserRegisterErr(passwordErr[0]);
    } else if (phoneErr) {
      setUserRegisterErr(phoneErr[0]);
    }
  };

  return (
    <Container>
      <Form
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={offset.thirty}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.screen}>
          {loader && <Loader loader={loader} />}
          <View style={styles.logoContainer}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.heading}>Sign Up</Text>
              <Text style={styles.subHeading}>Please register here</Text>
            </View>
            <Pressable onPress={() => _selectImage()}>
              {image ? (
                <Image style={styles.logo} source={{ uri: image }} />
              ) : (
                <Image
                  resizeMode="contain"
                  
                  style={[
                    styles.logo,
                    {
                      tintColor:'#979797',
                      borderWidth: imageErr ? 1 : 0,
                      borderColor: colors.red,
                    },
                  ]}
                  source={require('@App/images/placeholder.png')}
                />
              )}
            </Pressable>
            <Text style={{ width: '95%', paddingVertical: 5, marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {' '}
                Note: 
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                }}>
                {'  '}
                Upload your picture so we can validate you are not a robot.{' '}
              </Text>
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
                firstNameErr && resetErrStates(false);
              }}
              placeholder="First Name"
              error={firstNameErr}
              autoCapitalize="words"
            />
            <Input
              value={lastName}
              onChangeText={text => {
                setLastName(text);
                lastNameErr && resetErrStates(false);
              }}
              placeholder="Last Name"
              error={lastNameErr}
              autoCapitalize="words"
            />
            <Input
              value={email}
              onChangeText={text => {
                setEmail(text);
                emailErr && resetErrStates(false);
              }}
              placeholder="Email"
              error={emailErr}
            />

            <Input
              value={password}
              onChangeText={text => {
                setPassword(text);
                passwordErr && resetErrStates(false);
              }}
              placeholder="Password"
              secureTextEntry
              error={passwordErr}
            />
            <Input
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                passwordErr && resetErrStates(false);
              }}
              placeholder="Confirm Password"
              secureTextEntry
              error={passwordErr}
            />
            {userType === 'Service Provider' ? <Input
              value={about}
              onChangeText={text => {
                setAbout(text);
                aboutErr && resetErrStates(false);
              }}
              placeholder="Description"
              error={aboutErr}
            /> : null}
            <Input
              value={phone}
              onChangeText={text => {
                setPhone(text);
                phoneErr && resetErrStates(false);
              }}
              placeholder="Phone Number"
              error={phoneErr}
              keyboardType={isIOS ? 'numbers-and-punctuation' : 'number-pad'}
            />
            {/* <Input
              value={street}
              onChangeText={text => {
                setStreet(text);
                streetErr && resetErrStates(false);
              }}
              placeholder="Street"
              error={streetErr}
            />
            <Input
              value={city}
              onChangeText={text => {
                setCity(text);
                cityErr && resetErrStates(false);
              }}
              placeholder="City"
              error={cityErr}
            />
            <Input
              value={state}
              onChangeText={text => {
                setState(text);
                stateErr && resetErrStates(false);
              }}
              placeholder="State"
              error={stateErr}
            /> */}
            <Input
              value={zipCode}
              onChangeText={text => {
                setZipCode(text);
                zipCodeErr && resetErrStates(false);
              }}
              placeholder="Zip Code"
              error={zipCodeErr}
            />
            <View style={styles.radioButtons}>
              <RadioButton
                checked={userType === 'User' ? true : false}
                onCheck={() => {
                  setUserType('User');
                  setMainService(undefined);
                }}
                label="User (I am looking to hire a service provider.)"
              />
              <View style={{height:16}}/>
              <RadioButton
                checked={userType === 'Service Provider' ? true : false}
                onCheck={() => setUserType('Service Provider')}
                label="Service Provider (I  want to sign up to be found as a service provider.)"
              />
              <View />
            </View>
            {userType === 'Service Provider' ? (
              <>
                <Text style={styles.serviceHeading}>
                  Choose Service to offer
                </Text>
                <View style={styles.services}>
                  {mainServices.map((item: IMainService) => (
                    <RadioButton
                      key={`${item.id}`}
                      style={{ margin: 10, width: 120 }}
                      checked={mainService?.title === item.title ? true : false}
                      onCheck={() => {
                        setMainService(item);
                        serviceErr && setServiceErr(false);
                      }}
                      label={item.title}
                      error={serviceErr}
                    />
                  ))}
                </View>
              </>
            ) : null}
            <View style={styles.termsContainer}>
              {agreement ? (
                <Pressable
                  onPress={() => {
                    setAgreement(false);
                    agreementErr && resetErrStates(false);
                  }}>
                  <MaterialCommunityIcons
                    name="checkbox-marked-outline"
                    color={colors.black}
                    size={25}
                  />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    setAgreement(true);
                    agreementErr && resetErrStates(false);
                  }}>
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    color={agreementErr ? colors.red : colors.black}
                    size={25}
                  />
                </Pressable>
              )}
              <Text

                style={[styles.terms, { color: '#000' }]}>
                I accept all
              </Text>
              <View style={{ borderBottomWidth: .5, borderBottomColor: 'grey', bottom: 4,marginLeft:6 }}>
                <Text onPress={() =>
                  Linking.openURL('http://cheetahpros.com/privacy-policy')
                } style={[styles.terms, { color: '#5868E0', top: 3,right:8 }]}>Terms & Conditions.</Text>

              </View>
            </View>
            {userRegisterErr ? (
              <Text style={styles.error}>{userRegisterErr}</Text>
            ) : null}
          </View>
          <View style={styles.btnContainer}>
            <Button
              onPress={() => {
                _userRegister();
              }}
              title="Sign Up"
            />
            <View style={styles.accountContainer}>
              <Text style={styles.text}>Already have an account?</Text>
              <Text
                onPress={() => navigation.navigate('Login')}
                style={styles.signUp}>
                Log In
              </Text>
            </View>
          </View>
        </ScrollView>
      </Form>
    </Container>
  );
}
