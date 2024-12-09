// This is the index page for a shopper
// Shows all different farms
// Search bar allows search different farms using algorithm

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ShopperIndex({ navigation }) {
  // Hardcoded user data
  const farmers = [
    { name: 'Al\'s Farm', avatar: './assets/potato.png' },
    { name: 'Fran Farm', avatar: './assets/corn.png' },
    { name: 'Tina Farm', avatar: './assets/grapes.png' },
    { name: 'Apple Farm', avatar: './assets/milk.png' },
    { name: 'Family Farm', avatar: './assets/farmer.png' },
    { name: 'Emily Clark', avatar: './assets/corn.png' }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {farmers.map((user, index) => (
          <View key={index} style={styles.profileBlock}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  profileBlock: {
    backgroundColor: '#fff',
    width: '48%',  // Two columns, so each block takes up 48% of the width
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
