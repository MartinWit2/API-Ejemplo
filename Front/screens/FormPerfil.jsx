
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Input from '../components/Input'
import React from 'react'
import { commonStyles } from '../styles'
import { setDoc, doc, updateDoc } from 'firebase/firestore'
import { dbContext } from '../context/dbContext.js'

export default function FormPerfil({ route, navigation }) {
    const db = React.useContext(dbContext)
    const { hasProfile, prevProfile, user_uid } = route.params

    console.log(hasProfile)

    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')

    const crearPerfil = () => {
        const perfil = {
            nombre: nombre,
            apellido: apellido,
            user_uid: user_uid
        }
        console.log("Nombre:", nombre);
    console.log("Apellido:", apellido);
        if (hasProfile) {
            const fetchData = async () => {
                try {
                    await updateDoc(doc(db, "perfil", user_uid), perfil);
                } catch (error) {
                    console.error(error)
                } finally {
                }
            };
    
            fetchData();

        } else {
            const fetchData = async () => {
                try {
                    await setDoc(doc(db, "perfil", user_uid), perfil);
                } catch (error) {
                    console.error(error)
                } finally {
                }
            };
    
            fetchData();
        }

        navigation.replace('Perfil', { perfil: { nombre: nombre, apellido: apellido, user_uid: user_uid } });
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido</Text>
            <Input label='Nombre' placeholder='Ingrese su Nombre' setUsername={setNombre} secureTextEntry={false} />
            <Input label='Apellido' placeholder='Ingrese su Apellido' setPassword={setApellido} secureTextEntry={false} />
            <TouchableOpacity style={commonStyles.editButton} onPress={crearPerfil}>
                <Text style={commonStyles.buttonText}>Cargar Datos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.volverButton} onPress={() => navigation.navigate('Perfil', { perfil: { nombre: nombre, apellido: apellido, user_uid: user_uid } })}>
                <Text style={commonStyles.buttonText}>Volver</Text>
            </TouchableOpacity>
        </View>
    )
}