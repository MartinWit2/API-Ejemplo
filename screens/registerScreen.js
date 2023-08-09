import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';

const RegisterScreen = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleRegister = () => {
    if (registerUsername === '' || registerPassword === '') {
      Alert.alert('Error', 'Ingrese un usuario y una contraseña válidos.');
    } else {
      console.log('Registro exitoso');
    }
  };

  return (
    <View style={styles.container}>
      {/* Pantalla de Registro */}
      <TextInput
        style={styles.input}
        placeholder="Nuevo usuario"
        value={registerUsername}
        onChangeText={text => setRegisterUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        secureTextEntry
        value={registerPassword}
        onChangeText={text => setRegisterPassword(text)}
      />
      <Button title="Registrarse" onPress={handleRegister} />
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

export default RegisterScreen;
