import React from 'react';
import { Button, Image, StyleSheet, TextInput, View } from 'react-native';

const Verify = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/cal.png')} style={styles.image} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={() => navigation.navigate('Record')}
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

export default Verify;
