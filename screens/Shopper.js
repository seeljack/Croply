// Shopper signs up and fills in their info, creates profile for shopper
// on submit brings shopper to shopper index

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Shopper({navigation}) {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = () => {
    if (!address || !number || !email || !description ) {
      Alert.alert('Error', 'All fields are mandatory!');
      return;
    }
    Alert.alert('Success', 'Your profile has been created!');
    // Add logic to save or submit the data to your backend.
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>Shopper Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
      />
       <TextInput
        style={styles.input}
        placeholder="username"
        keyboardType="email-address"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {profileImage ? 'Change Profile Image' : 'Upload Profile Image'}
        </Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}

      {/* <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ShopperIndex')}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  backButtonText: {
    color: '#008000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#008000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#008000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



