import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({ navigation }) {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // Assuming this function fetches the farmer's current profile data
  const fetchProfile = () => {
    // For demo, we'll set some initial values here
    setAddress('123 Farm St, Rural Area');
    setNumber('555-1234');
    setEmail('farmer@example.com');
    setDescription('A small family farm producing organic vegetables.');
    setProfileImage('https://example.com/default-profile.jpg'); // Placeholder image URL
  };

  // Use useEffect to simulate fetching profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = () => {
    if (!address || !number || !email || !description) {
      Alert.alert('Error', 'All fields are mandatory!');
      return;
    }
    Alert.alert('Success', 'Your profile has been updated!');
    // Add logic to save or update the data in your backend or database
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

      <Text style={styles.headerText}>Farmer Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={number}
        onChangeText={setNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Description of Farm"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>
          {profileImage ? 'Change Profile Image' : 'Upload Profile Image'}
        </Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Update Profile</Text>
      </TouchableOpacity>
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
