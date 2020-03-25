import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber, validateOtp } from '../api/account';
import { RootStackParamList } from '../App';
import {
  AUTH_TOKEN,
  IS_USER_PROFILE_COMPLETED,
  USER_PROFILE
} from '../storage/keys';
import { saveItem } from '../storage/storage';
import {
  setAuthToken,
  setUserProfileCompleted,
  updateUserProfile
} from '../store/actions';
import { AppDispatch } from '../store/context';
import { text } from '../util/translation';
import Button from './common/Button';

type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;

const Verify = () => {
  const navigation = useNavigation();
  const route = useRoute<VerifyScreenRouteProp>();
  const [otp, setOtp] = useState('');
  // const { mobileNumber } = useContext(AppState);
  const dispatch = useContext(AppDispatch);
  const [alert, setAlert] = useState(null);
  const inputRef = useRef(null);

  const disabled = !/^\d{6}$/.test(otp);

  const onResendOtp = () => {
    sendOtpToNumber(route.params.mobileNumber)
      .then(() => {
        setAlert(text('msg_otp_sent'));
      })
      .catch(() => {
        setAlert(text('error_otp_not_sent'));
      });
  };

  const onChangeMobileNumber = () => {
    navigation.navigate('Login');
  };

  const onValidateOtp = () => {
    validateOtp(route.params.mobileNumber, otp)
      .then(async response => {
        try {
          await Promise.all([
            saveItem(USER_PROFILE, response.patient),
            saveItem(AUTH_TOKEN, response.authToken),
            saveItem(IS_USER_PROFILE_COMPLETED, !response.isNewUser)
          ]);
        } catch {
          throw new Error(text('error_generic'));
        }
        dispatch(updateUserProfile(response.patient));
        dispatch(setAuthToken(response.authToken));
        dispatch(setUserProfileCompleted(!response.isNewUser));
      })
      .catch((e: Error) => {
        setAlert(e.message);
      });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text('verify_mobile')}</Text>
      <Text style={styles.subText}>{text('enter_otp')}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={text('placeholder_enter_otp')}
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          autoFocus={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={text('btn_submit')}
          disabled={disabled}
          onPress={onValidateOtp}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.subTextOtp}>{text('otp_not_received')}</Text>
        <TouchableOpacity onPress={onResendOtp}>
          <Text style={{ ...styles.subTextOtp, color: '#00AEEF' }}>
            {text('otp_resend')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.subTextOtp}>.</Text>
      </View>
      <View style={styles.buttonOutlineContainer}>
        <Button
          text={text('btn_change_mobile_number')}
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
