import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';
import Input from '../components/Input';
import { commonStyles } from '../styles';

function Login({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  const login = () => {
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

    fetch('http://localhost:5000/login', options)
      .then(response => response.json())
      .then(response => {
        if (response.message === 'authenticated') {
          setMessage('Usuario autenticado correctamente');
          navigation.navigate('Home', { user });
        } else {
          setMessage('Los datos ingresados no son correctos');
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Input label='Usuario' placeholder='Ingrese su Nombre de Usuario' setUsername={setUsername} secureTextEntry={false} />
      <Input label='Contraseña' placeholder='Ingrese su Contraseña' setPassword={setPassword} secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={styles.linkText}>
        No tienes cuenta? <Link to={{ screen: 'SignUp'}} style={styles.link}>Regístrate</Link>
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
    padding: 10,
    fontSize: 16,
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

export default Login;
