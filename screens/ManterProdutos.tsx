import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { firestore } from '../firebase';
import { Produtos } from '../model/Produtos';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ManterProdutos = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState('');
  const [pesoSelecionado, setPesoSelecionado] = useState('Quilos');
  const [formProdutos, setFormProdutos] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const ProdutosRef = firestore.collection('Produtos');
  const navigation = useNavigation();

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formattedDate =
      date.getDate().toString().padStart(2, "0") + "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") + "/" +
      date.getFullYear();

    setFormProdutos({ ...formProdutos, datadeentrada: formattedDate });
    hideDatePicker();
  };

  const limparFormulario = () => {
    setIsSaving(false);
    setFormProdutos({});
    setTipoSelecionado('');
    setPesoSelecionado('Quilos');
  };

  const salvar = async () => {
    setIsSaving(true);

    try {
      const produtosRefComId = ProdutosRef.doc();
      const produtos = new Produtos(formProdutos);

      produtos.id = produtosRefComId.id;
      produtos.tipo = tipoSelecionado;
      produtos.peso = `${formProdutos.peso} ${pesoSelecionado}`;

      // ✅ CORREÇÃO AQUI
      produtos.emFalta = Number(formProdutos.quantidade) === 0;

      await produtosRefComId.set(produtos.toFirestore());

      alert(`Produto ${produtos.nome} adicionado com sucesso`);
      limparFormulario();

    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>

        {/* NOME */}
        <TextInput
          placeholder="Nome"
          value={formProdutos.nome}
          onChangeText={val => setFormProdutos({ ...formProdutos, nome: val })}
          style={styles.input}
          editable={!isSaving}
        />

        {/* TIPO */}
        <View style={styles.row}>
          <Text style={styles.label}>Tipo:</Text>

          <TouchableOpacity
            onPress={() => setTipoSelecionado('Perecível')}
            style={[styles.sliceButton, tipoSelecionado === 'Perecível' && styles.selected]}
          >
            <Text>Perecível</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTipoSelecionado('Não Perecível')}
            style={[styles.sliceButton, tipoSelecionado === 'Não Perecível' && styles.selected]}
          >
            <Text>Não Perecível</Text>
          </TouchableOpacity>
        </View>

        {/* PESO */}
        <View style={styles.row}>
          <Text style={styles.label}>Peso:</Text>

          <TextInput
            placeholder="Peso"
            value={formProdutos.peso?.toString()}
            onChangeText={val => setFormProdutos({ ...formProdutos, peso: val })}
            style={[styles.input, { flex: 1 }]}
            editable={!isSaving}
          />

          <TouchableOpacity
            onPress={() => setPesoSelecionado('Quilos')}
            style={[styles.sliceButton, pesoSelecionado === 'Quilos' && styles.selected]}
          >
            <Text>Kg</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPesoSelecionado('Gramas')}
            style={[styles.sliceButton, pesoSelecionado === 'Gramas' && styles.selected]}
          >
            <Text>g</Text>
          </TouchableOpacity>
        </View>

        {/* QUANTIDADE */}
        <TextInput
          placeholder="Quantidade"
          value={formProdutos.quantidade?.toString()}
          onChangeText={val =>
            setFormProdutos({
              ...formProdutos,
              quantidade: Number(val)
            })
          }
          style={styles.input}
          editable={!isSaving}
          keyboardType="numeric"
        />

        {/* DESCRIÇÃO */}
        <TextInput
          placeholder="Descrição"
          value={formProdutos.descricao}
          onChangeText={val =>
            setFormProdutos({ ...formProdutos, descricao: val })
          }
          style={styles.input}
          editable={!isSaving}
        />

        {/* DATA */}
        <Text>Data de entrada: {formProdutos.datadeentrada}</Text>
        <Button title="Adicionar Data" onPress={showDatePicker} />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      {/* BOTÕES */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={limparFormulario}
          style={[styles.button, { backgroundColor: 'red' }]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={salvar}
          style={[styles.button, { backgroundColor: 'green' }]}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Salvar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ManterProdutos;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    marginRight: 10,
  },
  sliceButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'gray',
    marginLeft: 5,
  },
  selected: {
    backgroundColor: '#7fff00',
  },
  buttonContainer: {
    width: '60%',
    marginTop: 40,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});