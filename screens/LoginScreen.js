import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import Button from '../components/Button';

const LoginScreen = ({ navigation, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [textoModal, setTextoModal] = useState("Inicio de sesión exitoso");

  const handleLogin = () => {
    if (username !== 'pepe' || password !== 'pepa') {
      // Mostrar mensaje de error
      console.log("Error, ingrese bien el usuario y la contraseña");
      setTextoModal("Error, ingrese bien el usuario y la contraseña");
      setShowSuccessModal(true);
    } else {
      // Mostrar el modal de inicio de sesión exitoso
      setTextoModal("Inicio de sesión exitoso");
      setShowSuccessModal(true);
      // Llamar a la función onLoginSuccess para manejar la lógica adicional
      onLoginSuccess();
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setTextoModal("Inicio de sesión exitoso");
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
      <Button title="Registrarse" onPress={() => navigation.navigate('Register')} />

      {/* Modal de Inicio de Sesión Exitoso */}
      <Modal visible={showSuccessModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{textoModal}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
