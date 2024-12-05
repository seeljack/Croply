import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function Page1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose who you are:</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Farmer')}
      >
        <Text style={styles.buttonText}>I am a Farmer</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Shopper')}
      >
        <Text style={styles.buttonText}>I am a Shopper</Text>
      </TouchableOpacity>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008000',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#008000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
