import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function FarmerMain({ navigation, route }) {
  const [notifications, setNotifications] = useState([]);
  const [inventory, setInventory] = useState(route.params?.inventory || []);

  // Simulate receiving a purchase notification
  useEffect(() => {
    const handlePurchaseNotification = (notification) => {
      // Send the notification with a random item from the inventory
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification,
      ]);
    };

    const selectRandomNotification = () => {
      if (inventory.length === 0) return; // Ensure there are items in inventory

      // Pick a random item from the inventory
      const randomIndex = Math.floor(Math.random() * inventory.length);
      const item = inventory[randomIndex];
      
      // Create a random notification based on the item
      const notification = {
        user: 'Random User',
        item: item.name,
        quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
        id: Date.now(),
      };

      handlePurchaseNotification(notification);
    };

    // Send a notification immediately when the app opens
    selectRandomNotification();

    // Simulate receiving a notification every 2 minutes
    const timer = setInterval(selectRandomNotification, 120000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [inventory]);

  const handlePurchaseNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
    // Deduct purchased quantity from inventory
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.name === notification.item
          ? { ...item, quantity: Math.max(item.quantity - notification.quantity, 0) }
          : item
      )
    );
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationText}>
        {item.user} bought {item.quantity} {item.item}(s).
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Notifications Section */}
      <Text style={styles.sectionHeader}>Notifications</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyText}>No notifications yet.</Text>
      )}

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('FarmerSummary', { 
              inventory: inventory, 
              setInventory: setInventory,
              notifications: notifications,
              setNotifications: setNotifications
            })}>
            <Icon name="inventory" size={24} color="#388E3C" style={styles.navIcon} />
            <Text style={styles.navButtonText}>Inventory</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('UserPurchaseHistory')}>
            <Icon name="history" size={24} color="#388E3C" style={styles.navIcon} />
            <Text style={styles.navButtonText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Profile')}>
            <Icon name="person" size={24} color="#388E3C" style={styles.navIcon} />
            <Text style={styles.navButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: 90,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationText: {
    fontSize: 16,
    color: '#333333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888888',
    marginTop: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#D3D3D3',
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#388E3C',
    marginTop: 5,
  },
  navButtonText2: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008000',
  },
});
