import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {Button, Container, Input, Loader} from '@App/components';
import {useAppSelector} from '@App/hooks';
import {userChangePassword} from '@App/utilis/APIs';
import {Error} from '@App/utilis/types';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

export default function ChangePasswordScreen() {
  const {token} = useAppSelector(({USER}) => USER);

  const [currentPass, setCurrentPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassErr, setCurrentPassErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [changePassErr, setChangePassErr] = useState('');
  const [loader, setLoader] = useState(false);

  const navigation = useNavigation();

  const _userChangePassword = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('old_password', currentPass);
        data.append('password', password);
        data.append('password_confirmation', confirmPassword);
        const res = await userChangePassword({data, token});
        setLoader(false);
        if (res && res.status === 'success') {
          navigation.goBack();
        } else {
          setChangePassErr('Something went wrong! Please try again.');
        }
      } catch (err) {
        setLoader(false);
        errorHandler(err);
      }
    }
  };

  const _validate = () => {
    if (!currentPass && !password && !confirmPassword) {
      resetErrStates(true);
      return false;
    } else if (!currentPass) {
      setCurrentPassErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    } else if (!password && !confirmPassword) {
      setPasswordErr(true);
      return false;
    } else if (password != confirmPassword) {
      setPasswordErr(true);
      return false;
    }
    setChangePassErr('');
    return true;
  };

  const resetErrStates = (error: boolean) => {
    setCurrentPassErr(error);
    setPasswordErr(error);
    setChangePassErr('');
  };

  const errorHandler = (err: Error) => {
    const currentPassErr = err['old_password'];
    const passwordErr = err['password'];
    if (currentPassErr) {
      setChangePassErr(currentPassErr[0]);
    } else if (passwordErr) {
      setChangePassErr(passwordErr[0]);
    }
  };

  return (
    <Container>
      {loader && <Loader loader={loader} />}
      <View
        style={{
          justifyContent: 'center',
        }}>
        <Text style={styles.heading}>
          Please enter your current and new password to update.
        </Text>
      </View>
      <Input
        inverted
        placeholder="Current Password"
        value={currentPass}
        onChangeText={text => {
          setCurrentPass(text);
          currentPassErr && resetErrStates(false);
        }}
        secureTextEntry
        error={currentPassErr}
      />
      <Input
        inverted
        placeholder="New Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          passwordErr && resetErrStates(false);
        }}
        secureTextEntry
        error={passwordErr}
      />
      <Input
        inverted
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          passwordErr && resetErrStates(false);
        }}
        secureTextEntry
        error={passwordErr}
      />
      <View style={{height: 30}}>
        {changePassErr ? (
          <Text style={styles.error}>{changePassErr}</Text>
        ) : null}
      </View>
      <Button
        style={styles.button}
        title="Update"
        onPress={_userChangePassword}
      />
    </Container>
  );
}
