import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber, validateOtp } from '../api/account';
import { C10, C11, C6, C7, C9 } from '../constants/colors';
import {
  AUTH_TOKEN,
  IS_USER_PROFILE_COMPLETED,
  USER_ID
} from '../storage/keys';
import { saveItem } from '../storage/storage';
import { updateAuthToken } from '../store/actions';
import { AppDispatch } from '../store/context';
import { text } from '../util/translation';
import Button from './common/Button';
import WrappedText from './common/WrappedText';
import { RootStackParamList } from './RootNavigator';

type VerifyScreenRouteProp = RouteProp<RootStackParamList, 'Verify'>;

const Verify = () => {
  const navigation = useNavigation();
  const route = useRoute<VerifyScreenRouteProp>();
  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState(null);
  const inputRef = useRef(null);
  const dispatch = useContext(AppDispatch);

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
            saveItem(USER_ID, response.patient.id),
            saveItem(AUTH_TOKEN, response.authToken),
            saveItem(IS_USER_PROFILE_COMPLETED, false)
          ]);
          dispatch(updateAuthToken(response.authToken));
        } catch {
          throw new Error(text('error_generic'));
        }
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
      <WrappedText style={styles.text}>{text('verify_mobile')}</WrappedText>
      <WrappedText style={styles.subText}>{text('enter_otp')}</WrappedText>
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
        <WrappedText style={styles.subTextOtp}>
          {text('otp_not_received')}{' '}
        </WrappedText>
        <TouchableOpacity onPress={onResendOtp}>
          <WrappedText style={{ ...styles.subTextOtp, color: C11 }}>
            {text('otp_resend')}
          </WrappedText>
        </TouchableOpacity>
        <WrappedText style={styles.subTextOtp}>.</WrappedText>
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
    backgroundColor: C6
  },
  text: {
    color: C10,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 72
  },
  subText: {
    color: C9,
    fontSize: 12,
    lineHeight: 14,
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
    backgroundColor: C7,
    height: 48
  },
  buttonContainer: {
    width: '75%',
    marginTop: 12
  },
  subTextOtp: {
    color: C9,
    fontSize: 12,
    marginTop: 24,
    textAlign: 'center'
  },
  buttonOutlineContainer: {
    width: '75%',
    marginTop: 60
  }
});

export default Verify;
