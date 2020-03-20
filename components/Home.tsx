import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './common/Button';

const Home = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const disabled = !/^\d{10}$/.test(phoneNumber);

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
          style={styles.input}
          placeholder="10 digit mobile number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
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
          text="Request OTP"
          onPress={() => navigation.navigate('Verify')}
          disabled={disabled}
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

export default Home;
