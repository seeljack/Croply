import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/App'
import Page1 from './screens/Page1'
import Farmer from './screens/Farmer'
import FarmerInventory from './screens/FarmerInventory'
const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Page1" 
        component={Page1} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Farmer" 
        component={Farmer} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FarmerInventory" 
        component={FarmerInventory} 
        options={{ headerShown: false }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Register the main navigator
registerRootComponent(MainNavigator);
