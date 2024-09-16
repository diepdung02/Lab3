import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native'; 
import DetailListItem from '../components/DetailListItem';
import { auth } from '../firebaseConfig'; // Đảm bảo bạn import auth từ firebaseConfig
import { signOut } from 'firebase/auth'; // Import signOut từ Firebase Authentication

const Options = ({ navigation }) => {
  // Hàm đăng xuất
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Sign Out', 'You have successfully signed out.');
        // navigation.replace('Login'); // Điều hướng đến màn hình Login/
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <DetailListItem title="Update Profile" />
      <DetailListItem title="Change Language" />
      
      {/* TouchableOpacity để xử lý khi nhấn Sign Out */}
      <TouchableOpacity onPress={handleSignOut}>
        <DetailListItem title="Sign Out" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Options;
