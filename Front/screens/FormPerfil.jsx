import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Input from '../components/Input';
import { setDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { dbContext } from '../context/dbContext.js';
import { commonStyles } from '../styles';
import { useNavigation } from '@react-navigation/native';

export default function FormPerfil({ route, navigation }) {
  const db = React.useContext(dbContext);
  const { hasProfile, prevProfile, user_uid } = route.params;

  const [nombre, setNombre] = React.useState(prevProfile?.nombre || '');
  const [apellido, setApellido] = React.useState(prevProfile?.apellido || '');
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const cargarDatos = async () => {
    const navigate = useNavigation();
    try {
      const perfilDoc = await getDoc(doc(db, 'perfil', user_uid));
      if (perfilDoc.exists()) {
        const perfilData = perfilDoc.data();
        setNombre(perfilData.nombre);
        setApellido(perfilData.apellido);
        setIsDataLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const crearPerfil = async () => {
    const perfil = {
      nombre: nombre,
      apellido: apellido,
      user_uid: user_uid,
    };

    try {
      if (hasProfile) {
        await updateDoc(doc(db, 'perfil', user_uid), perfil);
      } else {
        await setDoc(doc(db, 'perfil', user_uid), perfil);
      }

      setIsDataLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isDataLoaded) {
      // Navegación después de cargar los datos
      navigation.replace('Perfil', { perfil: { nombre, apellido, user_uid } });
    }
  }, [isDataLoaded]);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Bienvenido</Text>
      
      <Input
        label="Nombre"
        placeholder="Ingrese su Nombre"
        value={nombre}
        onChangeText={setNombre}
        secureTextEntry={false}
      />
      <Input
        label="Apellido"
        placeholder="Ingrese su Apellido"
        value={apellido}
        onChangeText={setApellido}
        secureTextEntry={false}
      />
      <TouchableOpacity style={commonStyles.editButton} onPress={crearPerfil}>
        <Text style={{color: 'white',fontSize: '20px',fontWeight: 'bold'}}>Aplicar</Text>
      </TouchableOpacity>

      {isDataLoaded && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>Nombre: {nombre}</Text>
          <Text style={styles.dataText}>Apellido: {apellido}</Text>
        </View>
      )}

      <TouchableOpacity
        style={commonStyles.volverButton}
        onPress={() => navigation.navigate('Perfil', { perfil: { nombre, apellido, user_uid } })}
      >
        <Text style={commonStyles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dataContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dataText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});


