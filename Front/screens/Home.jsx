
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { commonStyles } from '../styles'
import { dbContext } from '../context/dbContext.js'
import { getDocs, query, where, collection } from "firebase/firestore";
import { userContext } from '../context/userContext';
import { getAuth } from 'firebase/auth';

export default function Home({ navigation }) {
    const db = React.useContext(dbContext)
    const { user } = React.useContext(userContext)
    const [hasProfile, setHasProfile] = React.useState(false)
    const [profile, setProfile] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    const perfilRef = collection(db, "perfiles")
    const q = query(perfilRef, where("user_uid", "==", user.uid));

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                console.log(data[0])
                setProfile(data[0])
                if (data.length > 0) setHasProfile(true)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        const auth = getAuth()
        auth.signOut()
            .then(
                navigation.replace("Login")
            )
    }

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
                    navigation.replace('Perfil', { perfil: profile })
                }
            >
                <Text style={commonStyles.buttonText}>Ver perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.logoutButton}
                onPress={logout}
            >
                <Text style={commonStyles.buttonText}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    ) : (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido {user.username}</Text>
            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={() => navigation.replace('FormPerfil', { hasProfile: hasProfile, prevProfile: null, user_uid: user.uid })}
            >
                <Text style={commonStyles.buttonText}>Completa tu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.logoutButton}
                onPress={logout}
            >
                <Text style={commonStyles.buttonText}>Cerrar sesion</Text>
            </TouchableOpacity>
        </View>
    );
}