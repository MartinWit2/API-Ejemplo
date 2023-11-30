import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { dbContext } from '../context/dbContext.js';
import { getDocs, query, where, collection } from "firebase/firestore";
import { userContext } from '../context/userContext';
import { getAuth } from 'firebase/auth';

const Home = ({ navigation }) => {
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

    return (
        <View style={styles.container}>
            {isLoading ? (
                <Text style={styles.header}>Cargando...</Text>
            ) : hasProfile ? (
                <View>
                    <Text style={styles.header}>Bienvenido {profile.nombre} {profile.apellido}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.replace('Perfil', { perfil: profile })}
                    >
                        <Text style={styles.buttonText}>Ver perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={logout}
                    >
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={fetchDogImage}
                    >
                        <Text style={styles.buttonText}>Ver Perros</Text>
                    </TouchableOpacity>

                    {dogImage && (
                        <Image source={{ uri: dogImage }} style={styles.dogImage} />
                    )}
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Bienvenido {user.username}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.replace('FormPerfil', { hasProfile: hasProfile, prevProfile: null, user_uid: user.uid })}
                    >
                        <Text style={styles.buttonText}>Completa tu perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={logout}
                    >
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={fetchDogImage}
                    >
                        <Text style={styles.buttonText}>Ver Perros</Text>
                    </TouchableOpacity>

                    {dogImage && (
                        <Image source={{ uri: dogImage }} style={styles.dogImage} />
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dogImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
        borderRadius: 8,
    },
});

export default Home;
