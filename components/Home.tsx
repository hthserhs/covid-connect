import React from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/doc.png')} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="10 digit number"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Request OTP"
          onPress={() => navigation.navigate('Verify')}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    marginVertical: 72
  },
  image: {
    width: 128,
    height: 128
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    minWidth: 240,
    textAlign: 'center',
    fontSize: 18,
    padding: 6
  },
  buttonContainer: {
    minWidth: 180
  }
});

export default Home;
