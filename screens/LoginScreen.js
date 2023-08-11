import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username != 'pepe' || password !='pepa') {
      Alert.alert('Error', 'Ingrese el usuario y la contraseña.');
      console.log("Error, ingrese bien el usuario y la contraseña")
    } else {
      console.log('Inicio de sesión exitoso');
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {/* Pantalla de Inicio de Sesión */}
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={handleRegisterNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
});

export default LoginScreen;
