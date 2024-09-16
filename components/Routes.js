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
import RegisterScreen from '../screens/Register';
import colors from '../utils/colors';
import { auth } from '../firebaseConfig'; // Import auth từ firebaseConfig

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Các màn hình tab chính
const ContactsScreens = () => (
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

const FavoritesScreens = () => (
  <Stack.Navigator initialRouteName="Favorites" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Favorites" }} />
    <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
  </Stack.Navigator>
);

const UserScreens = ({ navigation }) => (
  <Stack.Navigator initialRouteName="User">
    <Stack.Screen
      name="User"
      component={User}
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

// Drawer Navigator
const DrawerNavigator = () => (
  <Drawer.Navigator>
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

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// Main Navigator
const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Use null as initial state to handle the loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    // Return null or a loading indicator while the authentication status is being checked
    return null; // You can replace this with a loading screen if desired
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
