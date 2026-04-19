import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [senhaIncorreta, setSenhaIncorreta] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a exibição da senha

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace('Menu');
            }
        });

        return unsubscribe;
    }, []);

    const irParaRegistro = () => {
        navigation.navigate('Registro');
    };

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
                setSenhaIncorreta(false);
            })
            .catch(error => {
                setSenhaIncorreta(true);
                setPassword('');
                console.error('Erro ao fazer login:', error.message);
            });
    };

    const toggleMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })} // Valor negativo para compensar o espaço ocupado pelo teclado
        >
            <Text style={styles.title}>Seu estoque melhor</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <View style={[styles.input, styles.passwordInput]}>
                    <TextInput
                        placeholder="Senha"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={{ flex: 1 }}
                        secureTextEntry={!mostrarSenha}
                    />
                    <TouchableOpacity onPress={toggleMostrarSenha}>
                        <Icon name={mostrarSenha ? 'eye-slash' : 'eye'} size={20} color="black" />
                    </TouchableOpacity>
                </View>
                {senhaIncorreta && (
                    <Text style={styles.errorMessage}>Senha incorreta. Tente novamente.</Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button, styles.greenButton]}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={irParaRegistro}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a9a9a9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    greenButton: {
        backgroundColor: '#006400',
        marginBottom: 10,
    },
    buttonOutline: {
        backgroundColor: 'white',
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        marginTop: 5,
    },
});
