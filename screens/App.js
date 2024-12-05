import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function App({ navigation }) { // Accept navigation prop
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://via.placeholder.com/150/FFFFFF/008000?text=Cropyly' }} // Replace with your actual logo URL
      />
      <Text style={styles.mainText}>Welcome to Cropyly!</Text>
      <Text style={styles.subText}>Connecting local farmers and customers.</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page1')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 175,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#008000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
