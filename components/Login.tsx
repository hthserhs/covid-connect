import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber } from '../api/account';
import { C10, C6, C7, C9 } from '../constants/colors';
import { text } from '../util/translation';
import Button from './common/Button';
import WrappedText from './common/WrappedText';

const Login = () => {
  const navigation = useNavigation();
  const [mobileNumber, setMobileNumber] = useState('');
  const [alert, setAlert] = useState(null);
  const inputRef = useRef(null);

  const disabled = !/^\d{10}$/.test(mobileNumber);

  const onRequestOtp = () => {
    sendOtpToNumber(mobileNumber)
      .then(() => {
        setAlert(text('msg_otp_sent'));
      })
      .catch(() => {
        setAlert(text('error_otp_not_sent'));
      });
    navigation.navigate('Verify', {
      mobileNumber
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/doc.png')} style={styles.image} />
      </View>
      <WrappedText style={styles.text}>{text('msg_primary_home')}</WrappedText>
      <WrappedText style={styles.subText}>
        {text('msg_secondary_home')}
      </WrappedText>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={text('placeholder_enter_mobile')}
          textContentType="telephoneNumber"
          keyboardType="number-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          autoFocus={true}
        />
        <FontAwesome
          name="mobile-phone"
          size={30}
          style={styles.inputFieldIcon}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text={text('btn_request_otp')}
          onPress={onRequestOtp}
          disabled={disabled}
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
  imageContainer: {
    marginTop: 72
  },
  image: {
    width: 128,
    height: 128
  },
  text: {
    color: C10,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12
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
  inputFieldIcon: {
    backgroundColor: C7,
    position: 'absolute',
    top: 9,
    left: 18
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
  }
});

export default Login;
