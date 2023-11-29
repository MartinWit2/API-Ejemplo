import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigator from './Navigator';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { dbContext } from './context/dbContext';
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

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);

  
  return (
    <dbContext.Provider value={database}>
      <userContext.Provider value={{ user, setUser }}>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </userContext.Provider>
    </dbContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff"
  }
});
