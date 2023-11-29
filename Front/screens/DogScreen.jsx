import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { commonStyles } from '../styles';

const DogScreen = ({ route, navigation }) => {
  const { dogImage, dogName, dogAge } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAdoptDog = () => {
    // Mostrar el cuadro de diálogo modal
    setModalVisible(true);
  };

  const handleAdoptionConfirmed = () => {
    // Lógica para manejar la adopción confirmada
    console.log('Estaremos en contacto. Correo electrónico:', email);

    // Cerrar el cuadro de diálogo modal
    setModalVisible(false);
  };

  const handleAdoptionCancelled = () => {
    // Cerrar el cuadro de diálogo modal
    setModalVisible(false);
  };

  return (
    <View style={commonStyles.container}>
      <Image source={{ uri: dogImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
      <Text style={commonStyles.header}>Nombre: {dogName}</Text>
      <Text style={commonStyles.header}>Edad: {dogAge} años</Text>

      <TouchableOpacity style={commonStyles.editButton} onPress={handleGoBack}>
        <Text style={commonStyles.buttonText}>Volver a Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={commonStyles.editButton} onPress={handleAdoptDog}>
        <Text style={commonStyles.buttonText}>Adoptar perro</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={commonStyles.modalContainer}>
          <Text style={commonStyles.modalText}>Ingresa tu correo electrónico:</Text>
          <TextInput
            style={commonStyles.modalInput}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
          />
          <TouchableOpacity onPress={handleAdoptionConfirmed}>
            <Text style={commonStyles.modalButton}>Confirmar adopción</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAdoptionCancelled}>
            <Text style={commonStyles.modalButton}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default DogScreen;



