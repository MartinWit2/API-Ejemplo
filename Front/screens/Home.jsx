import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '../styles'

export default function Home({ route, navigation }) {
    const { user } = route.params
    const [hasProfile, setHasProfile] = React.useState(false)
    const [profile, setProfile] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const url = 'http://localhost:5000/getProfile/' + user.username
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setHasProfile(response.message === 'profile found')
                const hasProfileBoca = response.message === 'profile found'
                hasProfileBoca ? setProfile({ 'id': response.id, 'nombre': response.nombre, 'apellido': response.apellido }) : setProfile()
            })
            .finally(
                setIsLoading(false)
            )
    }, [])


    return isLoading ? (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Cargando...</Text>
        </View>
    ) : hasProfile ? (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido {profile.nombre} {profile.apellido}</Text>
            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={() =>
                    navigation.navigate('Perfil', { perfil: profile })
                }
            >
                <Text style={commonStyles.buttonText}>Ver perfil</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido {user.username}</Text>
            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={() => navigation.navigate('FormPerfil', { hasProfile: hasProfile, prevProfile: null })}
            >
                <Text style={commonStyles.buttonText}>Completa tu perfil</Text>
            </TouchableOpacity>
        </View>
    );
}