import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, firestore } from '../firebase';
import { Usuario } from '../model/Usuario';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Registro = () => {
  const [formUsuario, setFormUsuario] = useState<Partial<Usuario>>({})
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [senhaDiferente, setSenhaDiferente] = useState(false)
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const refUsuario = firestore.collection("Usuario")
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Menu")
      }
    })

    return unsubscribe
  }, [])

  const criarRegistro = () => {
    if (formUsuario.senha === confirmarSenha) {
      setSenhaDiferente(false)
      auth
        .createUserWithEmailAndPassword(formUsuario.email, formUsuario.senha)
        .then(userCredentials => {
          const user = userCredentials.user;
          const refComIdUsuario = refUsuario.doc(auth.currentUser.uid);

          refComIdUsuario.set({
            id: auth.currentUser.uid,
            nome: formUsuario.nome,
            email: formUsuario.email,
            cargo: formUsuario.cargo,
            datanascimento: formUsuario.datanascimento
          })

          console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message))
    } else {
      setSenhaDiferente(true)
    }
  }

  const cancelar = () => {
    navigation.replace("Login")
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    const formattedDate = date.getDate().toString().padStart(2, "0") + "/" + ((date.getMonth() + 1).toString().padStart(2, "0")) + "/" + date.getFullYear();
    console.log(formattedDate)
    setFormUsuario({ ...formUsuario, datanascimento: formattedDate });
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome"
          value={formUsuario.nome}
          onChangeText={nome => setFormUsuario({ ...formUsuario, nome: nome })}
          style={styles.input}
        />
        <TextInput
          placeholder="Cargo"
          value={formUsuario.cargo}
          onChangeText={cargo => setFormUsuario({ ...formUsuario, cargo: cargo })}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={formUsuario.email}
          onChangeText={email => setFormUsuario({ ...formUsuario, email: email })}
          style={styles.input}
        />
        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Senha"
            value={formUsuario.senha}
            onChangeText={senha => setFormUsuario({ ...formUsuario, senha: senha })}
            secureTextEntry={!mostrarSenha}
            style={[styles.input, styles.passwordInput]}
          />
          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={styles.eyeButton}
          >
            <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmarSenha}
            onChangeText={senha => setConfirmarSenha(senha)}
            secureTextEntry={!mostrarConfirmarSenha}
            style={[styles.input, styles.passwordInput]}
          />
          <TouchableOpacity
            onPress={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            style={styles.eyeButton}
          >
            <Ionicons name={mostrarConfirmarSenha ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {senhaDiferente && <Text style={styles.errorMessage}>As senhas são diferentes</Text>}
        <TouchableOpacity onPress={showDatePicker} style={styles.input}>
          <Text>Data de Nascimento: {formUsuario.datanascimento}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textConfirm="Selecionar"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={criarRegistro}
          style={[styles.button, { backgroundColor: '#006400' }]}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={cancelar}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Registro

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeButton: {
    position: 'absolute',
    top: 15,
    right: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
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
  }
})
