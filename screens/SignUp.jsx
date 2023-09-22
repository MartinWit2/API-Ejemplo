import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import Input from '../components/Input';
import { commonStyles } from '../styles';

export default function SignUp({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const signUp = () => {
    const user = {
      username: username,
      pass: password
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    };

    fetch('http://localhost:5000/register', options)
      .then(response => response.json())
      .then(response => {
        if (response.message === 'user created') {
          setMessage('Usuario creado');
          navigation.navigate('Home', { user });
        } else {
          setMessage('El usuario ya existe');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrarse</Text>
      <Input label='Nombre de Usuario' placeholder='Ingrese un Nombre de Usuario' setUsername={setUsername} secureTextEntry={false} />
      <Input label='Contraseña' placeholder='Ingrese una Contraseña' setPassword={setPassword} secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        ¿Ya tienes una cuenta? <Link to={{ screen: 'Login'}} style={styles.link}>Iniciar sesión</Link>
      </Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    fontSize: 16,
    marginBottom: 20,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  message: {
    fontSize: 18,
    color: 'black',
  },
});
