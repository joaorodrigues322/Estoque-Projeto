import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  TextInput
} from "react-native";
import { firestore } from "../firebase";
import { Produtos } from "../model/Produtos";

const ProdutosEmFalta = () => {
  const [loading, setLoading] = useState(true); 
  const [produtos, setProdutos] = useState<Produtos[]>([]); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [datadeentrada, setDatadeentrada] = useState('');
  const [tipo, setTipo] = useState('');
  const produtoRef = firestore.collection("Produtos");

  useEffect(() => {
    const subscriber = produtoRef.onSnapshot((querySnapshot) => {
      const produtosLista: ((prevState: Produtos[]) => Produtos[]) | { id: string; }[] = [];
      querySnapshot.forEach((documentSnapshot) => {
        produtosLista.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });
      setProdutos(produtosLista);
      setLoading(false);
    });

    return () => subscriber();
  }, []);

  const handleEdit = (item) => {
    setSelectedProduct(item);
    setNome(item.nome);
    setPeso(item.peso);
    setQuantidade(item.quantidade);
    setDescricao(item.descricao);
    setDatadeentrada(item.datadeentrada);
    setTipo(item.tipo);
    setModalVisible(true);
  };

  const handleSave = () => {
    produtoRef.doc(selectedProduct.id).update({
      nome,
      peso,
      quantidade,
      descricao,
      datadeentrada,
      tipo
    }).then(() => {
      console.log("Produto atualizado com sucesso!");
      setModalVisible(false);
      setSelectedProduct(null);
    }).catch((error) => {
      console.error("Erro ao atualizar produto: ", error);
    });
  };

  const handleDelete = (id) => {
    produtoRef.doc(id).delete().then(() => {
      console.log("Produto deletado com sucesso!");
    }).catch((error) => {
      console.error("Erro ao deletar produto: ", error);
    });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  const Item = ({ item }) => (
    <View style={[styles.item, styles.produtoContainer, 
      item.quantidade === 0 ? styles.produtoZero : item.quantidade < 0 ? styles.produtoNegativo : null]}>
      <Text style={styles.title}>Nome : {item.nome}</Text>
      <Text style={styles.title}>Peso : {item.peso}</Text>
      <Text style={styles.title}>Quantidade : {item.quantidade}</Text>
      <Text style={styles.title}>Descricao : {item.descricao}</Text>
      <Text style={styles.title}>Data de Entrada : {item.datadeentrada}</Text>
      <Text style={styles.title}>Tipo : {item.tipo}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Editar"
          onPress={() => handleEdit(item)}
        />
        <Button
          title="Excluir"
          onPress={() => handleDelete(item.id)}
          color="red"
        />
      </View>
    </View>
  );

  const renderItem = ({ item }) => {
    if (item.quantidade < 1) {
      return (
        <Item item={item} />
      );
    } else {
      return null; // Não renderiza o item se a quantidade for maior que 1
    }
  };

  return (
    <SafeAreaView style={[styles.container, styles.containerlistar]}>
      <FlatList
        data={produtos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Editar Produto</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Nome"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPeso}
            value={peso}
            placeholder="Peso"
          />
          <TextInput
            style={styles.input}
            onChangeText={setQuantidade}
            value={quantidade}
            placeholder="Quantidade"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDescricao}
            value={descricao}
            placeholder="Descrição"
          />
          <TextInput
            style={styles.input}
            onChangeText={setDatadeentrada}
            value={datadeentrada}
            placeholder="Data de Entrada"
          />
          <TextInput
            style={styles.input}
            onChangeText={setTipo}
            value={tipo}
            placeholder="Tipo"
          />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Salvar"
              onPress={handleSave}
            />
            <Button
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Alterado para cinza claro
  },
  containerlistar: {
    backgroundColor: '#ccc', // Fundo cinza
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: '#000', // Cor do texto preto
  },
  produtoContainer: {
    borderWidth: 1,
    borderColor: 'black', // Borda preta
    padding: 10,
    marginBottom: 10,
  },
  produtoZero: {
    backgroundColor: '#7CFC00', // Verde mais claro e visível
  },
  produtoNegativo: {
    backgroundColor: '#ff7f7f', // Vermelho mais claro
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '80%'
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%'
  }
});

export default ProdutosEmFalta;
