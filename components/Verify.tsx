import { useNavigation } from '@react-navigation/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber, validateOtp } from '../api/account';
import { AUTH_TOKEN, IS_NEW_USER } from '../storage/keys';
import { saveItem } from '../storage/storage';
import {
  setAuthToken,
  setUserType,
  updateMobileNumber,
  updateUserProfile
} from '../store/actions';
import { AppDispatch, AppState } from '../store/context';
import { UserType } from '../store/types';
import Button from './common/Button';

const Verify = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const { mobileNumber } = useContext(AppState);
  const dispatch = useContext(AppDispatch);
  const [alert, setAlert] = useState(null);
  const inputRef = useRef(null);

  const disabled = !/^\d{6}$/.test(otp);

  const onResendOtp = () => {
    sendOtpToNumber(mobileNumber)
      .then(() => {
        setAlert('OTP sent!');
      })
      .catch(() => {
        setAlert('OTP could not be sent!');
      });
  };

  const onChangeMobileNumber = () => {
    dispatch(updateMobileNumber(''));
    navigation.navigate('Login');
  };

  const onValidateOtp = () => {
    validateOtp(mobileNumber, otp)
      .then(response => {
        return Promise.all([
          saveItem(AUTH_TOKEN, response.authToken),
          saveItem(IS_NEW_USER, response.isNewUser)
        ]).then(() => response);
      })
      .then(response => {
        if (response.patient) {
          dispatch(updateUserProfile(response.patient));
        }
        dispatch(setAuthToken(response.authToken));
        dispatch(
          setUserType(response.isNewUser ? UserType.New : UserType.Registered)
        );
      })
      .catch(() => {
        setAlert('OTP validation failed!');
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verify your mobile number!</Text>
      <Text style={styles.subText}>
        Enter the one time password (OTP) sent to your mobile number.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Enter 6 digit OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          autoFocus={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button text="Submit" disabled={disabled} onPress={onValidateOtp} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.subTextOtp}>Didn't receive OTP? </Text>
        <TouchableOpacity onPress={onResendOtp}>
          <Text style={{ ...styles.subTextOtp, color: '#00AEEF' }}>Resend</Text>
        </TouchableOpacity>
        <Text style={styles.subTextOtp}>.</Text>
      </View>
      <View style={styles.buttonOutlineContainer}>
        <Button
          text="Change Mobile Number"
          onPress={onChangeMobileNumber}
          outline={true}
        />
      </View>
      <Snackbar
        visible={alert}
        onDismiss={() => setAlert(null)}
        duration={3000}
      >
        {alert}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#393939',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 180
  },
  subText: {
    color: '#979797',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'normal',
    paddingHorizontal: '12%',
    marginTop: 12,
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 48,
    width: '75%'
  },
  input: {
    textAlign: 'center',
    fontSize: 21,
    backgroundColor: '#ebebeb',
    height: 48
  },
  buttonContainer: {
    width: '75%',
    marginTop: 12
  },
  subTextOtp: {
    color: '#979797',
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 24,
    textAlign: 'center'
  },
  buttonOutlineContainer: {
    width: '75%',
    marginTop: 60
  }
});

export default Verify;
