import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firestore } from '../firebase';

const CadastrarOferta = () => {
  const [precoAtual, setPrecoAtual] = useState('');
  const [precoOferta, setPrecoOferta] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [descricaoProduto, setDescricaoProduto] = useState('');
  const [IdProduto, setIdProduto] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const OfertasRef = firestore.collection('Ofertas');

  const salvarOferta = async () => {
    setIsSaving(true);
    const oferta = {
  precoAtual: parseFloat(precoAtual),
  precoOferta: parseFloat(precoOferta),
  nomeProduto,
  descricaoProduto,
  idProduto: IdProduto, // ✅ corrigido
  dataValidade: date.toISOString().split('T')[0],
};

    try {
      await OfertasRef.add(oferta);
      alert('Oferta cadastrada com sucesso!');
      limparFormulario();
    } catch (error) {
      console.error('Erro ao salvar oferta:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const limparFormulario = () => {
    setPrecoAtual('');
    setPrecoOferta('');
    setNomeProduto('');
    setDescricaoProduto('');
    setIdProduto('');
    setDate(new Date());
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome do produto"
          value={nomeProduto}
          onChangeText={setNomeProduto}
          style={styles.input}
          editable={!isSaving}
        />

        <TextInput
          placeholder="Id do produto"
          value={IdProduto}
          onChangeText={setIdProduto}
          style={styles.input}
          editable={!isSaving}
        />

        <TextInput
          placeholder="Preço atual do produto"
          value={precoAtual}
          onChangeText={setPrecoAtual}
          style={styles.input}
          keyboardType="numeric"
          editable={!isSaving}
        />
        <TextInput
          placeholder="Preço durante a oferta"
          value={precoOferta}
          onChangeText={setPrecoOferta}
          style={styles.input}
          keyboardType="numeric"
          editable={!isSaving}
        />

        <TextInput
          placeholder="Descrição do produto"
          value={descricaoProduto}
          onChangeText={setDescricaoProduto}
          style={[styles.input, { height: 100 }]}
          multiline
          editable={!isSaving}
        />

        <TouchableOpacity onPress={() => setShow(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>Selecionar Data de Validade da Oferta</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.selectedDateText}>Data Selecionada: {date.toISOString().split('T')[0]}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isSaving ? '#ccc' : '#006400' }]} // Alteração da cor para verde
          onPress={salvarOferta}
          disabled={isSaving}
        >
          <Text style={styles.buttonText}>{isSaving ? 'Salvando...' : 'Salvar Oferta'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
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
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  dateButton: {
    backgroundColor: '#006400',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  dateButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CadastrarOferta;
