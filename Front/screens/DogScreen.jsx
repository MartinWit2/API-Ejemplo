import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import Modal from 'react-native-modal';

const DogScreen = ({ route, navigation }) => {
  const { dogImage, dogName, dogAge } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAdoptDog = () => {
    setModalVisible(true);
  };

  const handleAdoptionConfirmed = () => {
    console.log('Estaremos en contacto. Correo electrónico:', email);
    setModalVisible(false);
    showAdoptionSuccessAlert(); // Muestra el mensaje de adopción exitosa
  };

  const handleAdoptionCancelled = () => {
    setModalVisible(false);
  };

  const showAdoptionSuccessAlert = () => {
    Alert.alert('Adopción Exitosa', '¡Felicidades! Has adoptado a ' + dogName);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: dogImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
      <Text style={styles.header}>Nombre: {dogName}</Text>
      <Text style={styles.header}>Edad: {dogAge} años</Text>

      <TouchableOpacity style={styles.editButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Volver a Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={handleAdoptDog}>
        <Text style={styles.buttonText}>Adoptar perro</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingresa tu correo electrónico:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Correo electrónico"
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity onPress={handleAdoptionConfirmed}>
              <Text style={styles.modalButton}>Confirmar adopción</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdoptionCancelled}>
              <Text style={styles.modalButton}>Cancelar</Text>
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
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default DogScreen;
