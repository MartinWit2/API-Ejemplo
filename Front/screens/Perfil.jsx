  /*import React from 'react';
  import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
  import { commonStyles } from '../styles';

  export default function Perfil({ route, navigation }) {
    const { perfil } = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Perfil de Usuario</Text>
        <View style={styles.profileInfo}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Nombre:</Text>
            <Text style={styles.fieldValue}>{perfil.nombre}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Apellido:</Text>
            <Text style={styles.fieldValue}>{perfil.apellido}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('FormPerfil', { hasProfile: true, prevProfile: perfil })
          }
        >
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    profileInfo: {
      marginBottom: 20,
    },
    field: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    fieldLabel: {
      fontWeight: 'bold',
      marginRight: 10,
    },
    fieldValue: {
      fontSize: 16,
    },
    editButton: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
  });*/
  import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { commonStyles } from '../styles'

export default function Perfil({ route, navigation }) {
  const { perfil } = route.params;
console.log("Nombre desde Perfil:", perfil.nombre);
console.log("Apellido desde Perfil:", perfil.apellido);

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Perfil de Usuario</Text>
      <View style={commonStyles.profileInfo}>
        <View style={commonStyles.field}>
          <Text style={commonStyles.fieldLabel}>Nombre:</Text>
          <Text style={commonStyles.fieldValue}>{perfil.nombre}</Text>
        </View>
        <View style={commonStyles.field}>
          <Text style={commonStyles.fieldLabel}>Apellido:</Text>
          <Text style={commonStyles.fieldValue}>{perfil.apellido}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={commonStyles.editButton}
        onPress={() =>
          navigation.replace('FormPerfil', { hasProfile: true, prevProfile: perfil, user_uid: perfil.user_uid })
        }
      >
        <Text style={commonStyles.buttonText}>Editar perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={commonStyles.volverButton}
        onPress={() =>
          navigation.replace('Home')
        }
      >
        <Text style={commonStyles.buttonText}>Volver a la Home</Text>
      </TouchableOpacity>
    </View>
  );
}
