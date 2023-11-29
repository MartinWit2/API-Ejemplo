import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { dbContext } from '../context/dbContext.js';
import { getDocs, query, where, collection } from "firebase/firestore";
import { userContext } from '../context/userContext';
import { getAuth } from 'firebase/auth';
import { commonStyles } from '../styles';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const DogScreen = ({ route }) => {
    const { dogImage, dogName, dogAge } = route.params;

    return (
        <View style={commonStyles.container}>
            <Image source={{ uri: dogImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
            <Text style={commonStyles.header}>Nombre: {dogName}</Text>
            <Text style={commonStyles.header}>Edad: {dogAge}</Text>
        </View>
    );
};

export default function Home({ navigation }) {
    const db = useContext(dbContext);
    const { user } = useContext(userContext);
    const [hasProfile, setHasProfile] = useState(false);
    const [profile, setProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [dogImage, setDogImage] = useState(null);

    const perfilRef = collection(db, "perfiles");
    const q = query(perfilRef, where("user_uid", "==", user.uid));

    const generateRandomName = () => {
        const names = ['Buddy', 'Charlie', 'Max', 'Lucy', 'Bailey', 'Cooper', 'Daisy'];
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    };

    const generateRandomAge = () => {
        return Math.floor(Math.random() * 10) + 1;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(q);
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push(doc.data());
                });
                console.log(data[0]);
                setProfile(data[0]);
                if (data.length > 0) setHasProfile(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const logout = () => {
        const auth = getAuth();
        auth.signOut().then(() => navigation.replace("Login"));
    };

    const fetchDogImage = async () => {
        try {
            const response = await axios.get('https://dog.ceo/api/breeds/image/random');
            setDogImage(response.data.message);
            const randomDogName = generateRandomName();
            const randomDogAge = generateRandomAge();
            navigation.navigate('DogScreen', { dogImage: response.data.message, dogName: randomDogName, dogAge: randomDogAge });
        } catch (error) {
            console.error('Error al obtener la imagen del perro', error);
        }
    };

    return isLoading ? (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Cargando...</Text>
        </View>
    ) : hasProfile ? (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Bienvenido {profile.nombre} {profile.apellido}</Text>
            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={() => navigation.replace('Perfil', { perfil: profile })}
            >
                <Text style={commonStyles.buttonText}>Ver perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={commonStyles.logoutButton}
                onPress={logout}
            >
                <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={fetchDogImage}
            >
                <Text style={commonStyles.buttonText}>Ver Perros</Text>
            </TouchableOpacity>

            {dogImage && (
                <Image source={{ uri: dogImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
            )}
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
                <Text style={commonStyles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={commonStyles.editButton}
                onPress={fetchDogImage}
            >
                <Text style={commonStyles.buttonText}>Ver Perros</Text>
            </TouchableOpacity>

            {dogImage && (
                <Image source={{ uri: dogImage }} style={{ width: 200, height: 200, marginVertical: 10 }} />
            )}
        </View>
    );
}
