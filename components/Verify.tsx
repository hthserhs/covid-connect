import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './common/Button';
import OTP from './OTP';

const Verify = ({ navigation }) => {
  const [otp, setOtp] = useState([]);
  const disabled = otp.length !== 4;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verify your mobile number!</Text>
      <Text style={styles.subText}>
        Enter the one time password (OTP) sent to your mobile number.
      </Text>
      <OTP onOtp={setOtp} />
      <View style={styles.buttonContainer}>
        <Button
          text="Submit"
          disabled={disabled}
          onPress={() => navigation.navigate('Record')}
        />
      </View>
      <Text style={styles.subTextOtp}>
        Didn't receive OTP?{' '}
        <Text style={{ color: '#00AEEF' }} onPress={console.log}>
          Resend
        </Text>
        .
      </Text>
      <View style={styles.buttonOutlineContainer}>
        <Button
          text="Change Mobile Number"
          onPress={() => navigation.navigate('Home')}
          outline={true}
        />
      </View>
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
    marginTop: 180,
    textTransform: 'uppercase'
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
    marginTop: 76,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    textAlign: 'center',
    fontSize: 21,
    backgroundColor: '#ebebeb',
    height: 48,
    width: '22%'
  },
  buttonContainer: {
    width: '75%',
    marginTop: 12
  },
  subTextOtp: {
    color: '#979797',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: 'normal',
    paddingHorizontal: '12%',
    marginTop: 24,
    textAlign: 'center'
  },
  buttonOutlineContainer: {
    width: '75%',
    marginTop: 60
  }
});

export default Verify;
