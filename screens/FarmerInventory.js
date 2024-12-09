import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FarmerInventory({ navigation }) {
  const [inventory, setInventory] = useState([

  ]);

  const handleQuantityChange = (id, value) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: parseFloat(value) } : item
      )
    );
  };

  const handleDescriptionChange = (id, value) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, description: value } : item
      )
    );
  };

  const handleAddFood = () => {
    const newFood = {
      id: Date.now(),
      name: '',
      quantity: '',
      description: '',
      image: null,
    };
    setInventory((prevInventory) => [...prevInventory, newFood]);
  };

  const handleDeleteFood = (id) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== id)
    );
  };

  const handleImageUpload = async (id) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
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
      setInventory((prevInventory) =>
        prevInventory.map((item) =>
          item.id === id ? { ...item, image: pickerResult.uri } : item
        )
      );
    }
  };

  const handleSubmit = () => {
    if (inventory.length === 0) {
      Alert.alert('Error', 'Please add at least one food item before submitting.');
      return;
    }
  
    navigation.navigate('FarmerMain', { inventory });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>
          Enter the different foods you have at your farm. Feel free to add a
          short description and upload a photo for each food. Shoppers will see
          these details!
        </Text>
        {inventory.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <TextInput
                style={styles.itemNameInput}
                placeholder="Enter food name"
                value={item.name}
                onChangeText={(value) =>
                  setInventory((prevInventory) =>
                    prevInventory.map((food) =>
                      food.id === item.id ? { ...food, name: value } : food
                    )
                  )
                }
              />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteFood(item.id)}
              >
                <Text style={styles.deleteButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            {/* Ensure proper spacing between the sections */}
            <View style={styles.imageContainer}>
              {item.image && <Image source={{ uri: item.image }} style={styles.foodImage} />}
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={() => handleImageUpload(item.id)}
              >
                <Text style={styles.imageUploadButtonText}>
                  {item.image ? 'Change Photo' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter quantity"
              keyboardType="numeric"
              value={item.quantity}
              onChangeText={(value) => handleQuantityChange(item.id, value)}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Enter description (optional)"
              multiline
              value={item.description}
              onChangeText={(value) => handleDescriptionChange(item.id, value)}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddFood}>
          <Text style={styles.addButtonText}>+ Add New Food</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Inventory</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemNameInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    fontSize: 16,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#E53935',
    padding: 5,
    borderRadius: 50,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  foodImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageUploadButton: {
    backgroundColor: '#388E3C',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageUploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    marginBottom: 10,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    height: 60,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#8BC34A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#388E3C',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
