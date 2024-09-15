// MainNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons'; 
import Contacts from '../screens/Contacts';
import Profile from '../screens/Profile';
import Favorites from '../screens/Favorites'; 
import User from '../screens/User';
import Options from '../screens/Options';
import LoginScreen from '../screens/Login'; 
import colors from '../utils/colors';
import { auth } from '../firebaseConfig'; // Import auth từ firebaseConfig

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const Stack = createNativeStackNavigator(); 

const ContactsScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Contacts" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contacts" component={Contacts} options={{ title: "Contacts" }} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params; 
          const { name } = contact;
          return {
            title: name.split(' ')[0], 
            headerTintColor: 'white', 
            headerStyle: {
              backgroundColor: colors.blue,
            }
          };
        }}
      />
    </Stack.Navigator>
  );
};

const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Stack.Navigator>
  );
};

const UserScreens = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User" component={User} 
        options={{
          headerTitle: "Me", 
          headerTintColor: 'white', 
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerRight: () => (
            <MaterialIcons 
              name="settings" 
              size={24}
              style={{ color: 'white', marginRight: 10 }} 
              onPress={() => navigation.navigate('Options')}
            />
          ),
        }}
      />
      <Stack.Screen name="Options" component={Options} options={{ title: "Options" }} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator(); 

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="ContactsScreens">
      <Drawer.Screen name="ContactsScreens" component={ContactsScreens} 
        options={{
          drawerIcon: getDrawerItemIcon('list'),
        }}
      />
      <Drawer.Screen name="FavoritesScreens" component={FavoritesScreens} 
        options={{
          drawerIcon: getDrawerItemIcon('star'),
        }}
      />
      <Drawer.Screen name="UserScreens" component={UserScreens} 
        options={{
          drawerIcon: getDrawerItemIcon('person'),
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user); 
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
