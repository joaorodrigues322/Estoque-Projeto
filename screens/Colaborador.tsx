import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button
} from "react-native";

const ColaboradorScreen = ({ navigation }) => {
  const [editando, setEditando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [funcionario, setFuncionario] = useState({
    nome: "João da Silva",
    email: "a@gmail.com",
    senha: "123456",
    dataNascimento: "01/01/1990",
    cargo: "Repositor",
    setor: "bebidas"
  });

  const [suporteVisible, setSuporteVisible] = useState(false);

  const handleEditar = () => {
    setEditando(!editando);
  };

  const handleChangeText = (key: string, value: string) => {
    setFuncionario({ ...funcionario, [key]: value });
  };

  const handleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleSuportePress = () => {
    setSuporteVisible(true);
  };

  const handleCloseSuporte = () => {
    setSuporteVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png"
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>{funcionario.nome}</Text>
          {!editando ? (
            <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email:</Text>
                <Text style={styles.fieldValue}>{funcionario.email}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Senha:</Text>
                <Text style={styles.fieldValue}>{mostrarSenha ? funcionario.senha : "********"}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Data de Nascimento:</Text>
                <Text style={styles.fieldValue}>{funcionario.dataNascimento}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Cargo:</Text>
                <Text style={styles.fieldValue}>{funcionario.cargo}</Text>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Setor:</Text>
                <Text style={styles.fieldValue}>{funcionario.setor}</Text>
              </View>
              <TouchableOpacity onPress={handleEditar}>
                <Text style={styles.editar}>Editar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Email:</Text>
                <TextInput
                  style={styles.input}
                  value={funcionario.email}
                  onChangeText={(text) => handleChangeText("email", text)}
                  placeholder="Email"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Senha:</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={funcionario.senha}
                    onChangeText={(text) => handleChangeText("senha", text)}
                    placeholder="Senha"
                    secureTextEntry={!mostrarSenha}
                  />
                  <TouchableOpacity onPress={handleMostrarSenha} style={styles.showPasswordIcon}>
                    <Text style={styles.showPasswordText}>{mostrarSenha ? "Ocultar" : "Mostrar"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Data de Nascimento:</Text>
                <TextInput
                  style={styles.input}
                  value={funcionario.dataNascimento}
                  onChangeText={(text) => handleChangeText("dataNascimento", text)}
                  placeholder="Data de Nascimento"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Cargo:</Text>
                <TextInput
                  style={styles.input}
                  value={funcionario.cargo}
                  onChangeText={(text) => handleChangeText("cargo", text)}
                  placeholder="Cargo"
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>Setor:</Text>
                <TextInput
                  style={styles.input}
                  value={funcionario.setor}
                  onChangeText={(text) => handleChangeText("setor", text)}
                  placeholder="Setor"
                />
              </View>
              <TouchableOpacity onPress={handleEditar}>
                <Text style={styles.salvar}>Salvar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Seção de Contato com o Suporte */}
        <TouchableOpacity onPress={handleSuportePress} style={styles.section}>
          <Text style={styles.sectionTitle}>Contate o Suporte:</Text>
          <View style={[styles.option, { backgroundColor: "#d3d3d3" }]}>
            <Text style={styles.optionTitle}>Suporte ao Usuário</Text>
            <Text style={styles.optionDescription}>
              Precisa de ajuda? Entre em contato conosco!
            </Text>
          </View>
        </TouchableOpacity>

        {/* Modal de Suporte */}
        <Modal
          visible={suporteVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCloseSuporte}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Problemas Comuns e Soluções:</Text>
              <Text style={styles.modalText}>
                1. Problema: Incapaz de fazer login.
              </Text>
              <Text style={styles.modalText}>
                Solução: Verifique se o email e a senha estão corretos e se há conexão com a internet.
              </Text>
              <Text style={styles.modalText}>
                2. Problema: Aplicativo travando frequentemente.
              </Text>
              <Text style={styles.modalText}>
                Solução: Tente reiniciar o aplicativo ou o dispositivo.
              </Text>
              <Text style={styles.modalText}>
                3. Problema: Não é possível visualizar todas as ofertas disponíveis.
              </Text>
              <Text style={styles.modalText}>
                Solução: Atualize o aplicativo para a versão mais recente disponível na loja de aplicativos.
              </Text>
              <Button title="Fechar" onPress={handleCloseSuporte} />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#a9a9a9"
  },
  header: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 100
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333"
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5
  },
  editar: {
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline"
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  showPasswordIcon: {
    marginLeft: 10
  },
  showPasswordText: {
    color: "blue",
    textDecorationLine: "underline"
  },
  field: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center"
  },
  fieldLabel: {
    width: "30%",
    textAlign: "right",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold"
  },
  fieldValue: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10
  },
  salvar: {
    fontSize: 14,
    color: "green",
    textDecorationLine: "underline",
    marginTop: 10
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  option: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#d3d3d3",
    marginBottom: 10
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333"
  },
  optionDescription: {
    fontSize: 16,
    color: "#333"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333"
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333"
  }
});

export default ColaboradorScreen;
