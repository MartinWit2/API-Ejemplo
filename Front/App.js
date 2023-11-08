/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;*/

/*import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Modal, Text, TouchableOpacity, View } from 'react-native'; // Importa los componentes necesarios
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/SignUp';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleLoginSuccess = () => {
    setShowSuccessModal(true);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login">
          {props => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;*/
import { StyleSheet, SafeAreaView } from 'react-native'
import Navigator from './Navigator'
import React, { useState } from 'react'
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import { dbContext } from './context/dbContext.js';
import { userContext } from './context/userContext';

const firebaseConfig = {
  apiKey: "AIzaSyBakwyKdT57XYPkwifYGXMU7U4_bWXBCbA",
  authDomain: "api-ejemplo-2d2c7.firebaseapp.com",
  projectId: "api-ejemplo-2d2c7",
  storageBucket: "api-ejemplo-2d2c7.appspot.com",
  messagingSenderId: "128326182850",
  appId: "1:128326182850:web:a59a8f24cf6df4e361185b",
  measurementId: "G-DEKCF81X31"
};

const app = initializeApp(firebaseConfig)

const database = getFirestore(app)

export default function App() {
  const [user, setUser] = useState()

  return (
    <dbContext.Provider value={database}>
      <userContext.Provider value={{user, setUser}}>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </userContext.Provider>
    </dbContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  }
})

