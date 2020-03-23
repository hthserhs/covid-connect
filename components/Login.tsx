import { FontAwesome } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { sendOtpToNumber } from '../api/account';
import { AppNavigatorParamList } from '../App';
import { updateMobileNumber } from '../store/actions';
import { StoreDispatch, StoreState } from '../store/context';
import Button from './common/Button';

type BottomTabScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamList,
  'Login'
>;

interface Props {
  navigation: BottomTabScreenNavigationProp;
}

const Login: FC<Props> = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [alert, setAlert] = useState(null);
  const disabled = !/^\d{10}$/.test(mobileNumber);
  const dispatch = useContext(StoreDispatch);
  const inputRef = useRef(null);
  const { mobileNumber: mobNumber } = useContext(StoreState);

  const onRequestOtp = () => {
    dispatch(updateMobileNumber(mobileNumber));
    sendOtpToNumber(mobileNumber)
      .then(() => {
        setAlert('OTP sent!');
      })
      .catch(() => {
        setAlert('OTP could not be sent!');
      });
    navigation.navigate('Verify');
  };

  useEffect(() => {
    inputRef.current.focus();
    setMobileNumber(mobNumber);
  }, [mobNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/doc.png')} style={styles.image} />
      </View>
      <Text style={styles.text}>Be safe. Stay safe.</Text>
      <Text style={styles.subText}>
        Record your symptoms and be notified of recommendations from your
        healthcare providers.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="10 digit mobile number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
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
        <Button text="Request OTP" onPress={onRequestOtp} disabled={disabled} />
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
  imageContainer: {
    marginTop: 144
  },
  image: {
    width: 128,
    height: 128
  },
  text: {
    color: '#393939',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12
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
    width: '75%'
  },
  inputFieldIcon: {
    backgroundColor: '#ebebeb',
    position: 'absolute',
    top: 9,
    left: 18
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
  }
});

export default Login;
