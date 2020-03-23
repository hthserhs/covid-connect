import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber, validateOtp } from '../api/account';
import { AppNavigatorParamList } from '../App';
import { updateMobileNumber } from '../store/actions';
import { StoreDispatch, StoreState } from '../store/context';
import Button from './common/Button';
import OTP from './common/otp/OTP';

type BottomTabScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamList,
  'Verify'
>;

interface Props {
  navigation: BottomTabScreenNavigationProp;
}

const Verify: FC<Props> = ({ navigation }) => {
  const [otp, setOtp] = useState([]);
  const { mobileNumber } = useContext(StoreState);
  const dispatch = useContext(StoreDispatch);
  const [alert, setAlert] = useState(null);
  const disabled = otp.length !== 6;

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
    validateOtp(mobileNumber, otp.join(''))
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(error => {
        setAlert('OTP validation failed!');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verify your mobile number!</Text>
      <Text style={styles.subText}>
        Enter the one time password (OTP) sent to your mobile number.
      </Text>
      <OTP onOtp={setOtp} />
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
