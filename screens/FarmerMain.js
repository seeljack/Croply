import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function FarmerMain({ navigation, route }) {
  const [notifications, setNotifications] = useState([]);
  const [inventory, setInventory] = useState(route.params?.inventory || []);

  // Simulate receiving a purchase notification
  useEffect(() => {
    const exampleNotification = {
      user: 'John Doe',
      item: 'Apples',
      quantity: 5,
      id: Date.now(),
    };
    // Example: Simulate receiving a notification after 5 seconds
    const timer = setTimeout(() => handlePurchaseNotification(exampleNotification), 5000);

    return () => clearTimeout(timer);
  }, []);

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
    Alert.alert(
      'New Purchase',
      `${notification.user} bought ${notification.quantity} ${notification.item}(s)!`
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FarmerInventory', { inventory })}
        >
          <Text style={styles.navButtonText}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('FarmerProfile')}
        >
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('UserPurchaseHistory')}
        >
          <Text style={styles.navButtonText}>History</Text>
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
    paddingTop: 20,
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
    backgroundColor: '#E8F5E9',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    marginTop: 20,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388E3C',
  },
});
