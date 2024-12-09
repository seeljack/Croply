import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
export default function FarmerSummaryPage({ route, navigation }) {
  const [inventory, setInventory] = useState(route.params?.inventory || []);
  const [notifications, setNotifications] = useState(route.params?.notifications || []);


  useEffect(() => {
    // Update notifications whenever coming back from FarmerMain screen
    if (route.params?.notifications) {
      setNotifications(route.params.notifications);
    }
  }, [route.params?.notifications]);


  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    description: '',
    image: null,
  });

  const handleAdd = () => {
    if (newItem.name && newItem.quantity) {
      const itemToAdd = {
        ...newItem,
        id: Date.now(),
        quantity: parseFloat(newItem.quantity), // Convert quantity to a number
      };

      setInventory((prevInventory) => [...prevInventory, itemToAdd]);
      Alert.alert('Success', 'Product added to inventory!');
      setNewItem({ name: '', quantity: '', description: '', image: null });
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

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

  const handleInputChange = (field, value) => {
    setNewItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const handleDelete = (id) => {
    const updatedInventory = inventory.filter((item) => item.id !== id);
    setInventory(updatedInventory);
  };

  const handleIncreaseQuantity = (id) => {
    setInventory((prevInventory) => 
      prevInventory.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Inventory Summary</Text>

      <View style={styles.addFoodForm}>
        <Text style={styles.subHeaderText}>Add New Product</Text>
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

      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            <Text style={styles.description}>Description: {item.description}</Text>

            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleIncreaseQuantity(item.id)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleDecreaseQuantity(item.id)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.navigationBar}>
      <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('FarmerSummary', { 
                inventory: inventory, 
                setInventory: setInventory,
                notifications: notifications,
                setNotifications: setNotifications
            })}
            >
            <Icon name="inventory" size={24} color="#388E3C" style={styles.navIcon} />
            <Text style={styles.navButtonText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FarmerMain', { 
                inventory: inventory, 
                setInventory: setInventory,
                notifications: notifications,
                setNotifications: setNotifications
            })}
        >
          <FontAwesome5 name="history" size={20} color="#008000" />
          <Text style={styles.navButtonText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FarmerProfile')}
        >
          <MaterialIcons name="person" size={24} color="#388E3C" />
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#E8F5E9',
    paddingTop: 80,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#388E3C',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#388E3C',
  },
  addFoodForm: {
    marginBottom: 20,
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
  itemContainer: {
    marginBottom: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#388E3C',
  },
  quantity: {
    fontSize: 16,
    marginTop: 6,
    color: '#388E3C',
  },
  description: {
    fontSize: 14,
    color: '#388E3C',
    marginTop: 6,
  },
  quantityControls: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: '#388E3C',
    marginTop: 5,
  },
});
