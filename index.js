import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/App'
import Page1 from './screens/Page1'
import Farmer from './screens/Farmer'
import FarmerInventory from './screens/FarmerInventory'
import FarmerMain from './screens/FarmerMain'
import FarmerSummary from './screens/FarmerSummary'
// import Shopper from './screens/Shopper'
// import ShopperIndex from './screens/ShopperIndex'
import AddFood from './screens/AddFood'
import Profile from './screens/Profile'

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
      <Stack.Screen 
        name="FarmerMain" 
        component={FarmerMain} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FarmerSummary" 
        component={FarmerSummary} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false }} 
      />
      {/* <Stack.Screen 
        name="ShopperIndex" 
        component={ShopperIndex} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AddFood" 
        component={AddFood} 
        options={{ headerShown: false }} 
      /> */}
      </Stack.Navigator>

    </NavigationContainer>
  );
}

// Register the main navigator
registerRootComponent(MainNavigator);
