import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from '@react-navigation/native';
import Input from '../components/Input';
import { commonStyles } from '../styles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { userContext } from '../context/userContext';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = React.useContext(userContext);

  const auth = getAuth();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userLogged = userCredential.user;
        setUser(userLogged);
        setMessage('Usuario autenticado correctamente');
        navigation.replace('Home');
      })
      .catch((error) => {
        console.error(error);
        setMessage('Los datos ingresados no son correctos');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ingresar</Text>
      <Input label='Email' placeholder='Pon tu email' value={email} onChangeText={setEmail} secureTextEntry={false} />
      <Input label='Contraseña' placeholder='Ingrese su Contraseña' value={password} onChangeText={setPassword} secureTextEntry={true} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.link}>¿No tienes una cuenta aún? <Link to={{ screen: 'SignUp' }}>Registrarse</Link></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 100, // Ajusta el tamaño de la imagen según tus necesidades
    height: 100, // Ajusta el tamaño de la imagen según tus necesidades
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#069e8c',
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
  message: {
    padding: 10,
    fontSize: 18,
    color: 'black'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default Login;
