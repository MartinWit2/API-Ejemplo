import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Input from '../components/Input'
import React from 'react'
import { commonStyles } from '../styles'

export default function FormPerfil({ route, navigation }) {
    const { hasProfile, prevProfile } = route.params

    console.log(prevProfile)

    const [nombre, setNombre] = React.useState('')
    const [apellido, setApellido] = React.useState('')

    const crearPerfil = () => {
        const perfil = {
            nombre: nombre,
            apellido: apellido
        }
        console.log(perfil)
        if (hasProfile) {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(perfil)
            }
            const url = 'http://localhost:5000/updateProfile/' + prevProfile.id
            fetch(url, options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.message === 'profile updated') {
                        navigation.navigate('Perfil', { perfil })
                    }
                })

        } else {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(perfil)
            }
            fetch('http://localhost:5000/createProfile', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    if (response.message === 'profile created') {
                        navigation.navigate('Perfil', { perfil })
                    }
                })
        }
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido</Text>
            <Input label='Nombre' placeholder='Ingrese su Nombre' setUsername={setNombre} secureTextEntry={false} />
            <Input label='Apellido' placeholder='Ingrese su Apellido' setPassword={setApellido} secureTextEntry={false} />
            <TouchableOpacity style={commonStyles.editButton} onPress={crearPerfil}>
                <Text style={commonStyles.buttonText}>Cargar Datos</Text>
            </TouchableOpacity>
        </View>
    )
}