import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddFoodPage({ route, navigation }) {
  // Extract setInventory from route.params, with a fallback to avoid errors
  const { setInventory } = route.params;

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    description: '',
    image: null,
  });

  // Handle adding the new item
  const handleAdd = () => {
    if (newItem.name && newItem.quantity) {
      const itemToAdd = {
        ...newItem,
        id: Date.now(), // Generate a unique ID
      };

      // Use setInventory to update the inventory
      setInventory((prevInventory) => [...prevInventory, itemToAdd]);

      Alert.alert('Success', 'Product added to inventory!');
      navigation.goBack(); // Navigate back to the previous screen
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  // Handle image upload via ImagePicker
  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'You need to allow access to your photos!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setNewItem((prevItem) => ({
        ...prevItem,
        image: pickerResult.uri,
      }));
    }
  };

  // Handle changes to input fields
  const handleInputChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={newItem.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter quantity"
        keyboardType="numeric"
        value={newItem.quantity}
        onChangeText={(value) => handleInputChange('quantity', value)}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter description (optional)"
        multiline
        value={newItem.description}
        onChangeText={(value) => handleInputChange('description', value)}
      />
      <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
        <Text style={styles.imageUploadButtonText}>
          {newItem.image ? 'Change Photo' : 'Upload Photo'}
        </Text>
      </TouchableOpacity>
      {newItem.image && <Image source={{ uri: newItem.image }} style={styles.foodImage} />}

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#388E3C',
  },
  input: {
    height: 40,
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  imageUploadButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageUploadButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
