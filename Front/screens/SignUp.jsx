import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Link } from '@react-navigation/native'
import Input from '../components/Input'
import React from 'react'
import { commonStyles } from '../styles'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { userContext } from '../context/userContext'

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const { setUser } = React.useContext(userContext);

  const auth = getAuth();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user)
        const user = userCredential.user.email;
        setUser(userCredential.user.email);
        console.log(user);
        setMessage("Usuario creado");
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error(error);
        setMessage("El registro no pudo completarse");
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Registrarse</Text>
      <Input label='Email' placeholder='Ingresa un mail' value={email} onChangeText={setEmail} secureTextEntry={false} />
      <Input label='Password' placeholder='Ingrese una Contraseña' value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Text style={styles.passwordRequirement}>La contraseña debe tener al menos 6 caracteres</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.haveAccountText}>¿Ya tienes una cuenta? <Link style={styles.link} to={{ screen: 'Login' }}>Ingresar</Link></Text>
      <Text style={styles.message}>{message}</Text>
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
  passwordRequirement: {
    padding: 10,
    fontSize: 14,
    color: 'gray'
  },
  haveAccountText: {
    paddingVertical: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  message: {
    padding: 10,
    fontSize: 18,
    color: 'black'
  }
});
