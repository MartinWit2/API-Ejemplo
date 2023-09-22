import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const Input = (props) => {
    const actualizar = (text) => {
        if (props.label === 'Username' || props.label === 'Nombre') props.setUsername(text);
        else if (props.label === 'Password' || props.label === 'Apellido') props.setPassword(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                secureTextEntry={props.secureTextEntry}
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={(text) => actualizar(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        margin: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
});

export default Input;
