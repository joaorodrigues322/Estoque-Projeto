import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firestore } from "../firebase";
import { Ofertas } from "../model/Ofertas";
import moment from "moment";

const ListarOfertas = () => {
  const [loading, setLoading] = useState(true);
  const [ofertas, setOfertas] = useState<Ofertas[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredOfertas, setFilteredOfertas] = useState<Ofertas[]>([]);
  const ofertaRef = firestore.collection("Ofertas");

  useEffect(() => {
    const subscriber = ofertaRef.onSnapshot((querySnapshot) => {
      const ofertasLista: Ofertas[] = [];
      querySnapshot.forEach((documentSnapshot) => {
        const data = documentSnapshot.data();
        ofertasLista.push({
          id: documentSnapshot.id,
          idProduto: data.idProduto || "",
          nomeProduto: data.nomeProduto || "",
          descricaoProduto: data.descricaoProduto || "",
          precoAtual: data.precoAtual || "",
          precoOferta: data.precoOferta || "",
          dataValidade: data.dataValidade || "",
        });
      });
      setOfertas(ofertasLista);
      setLoading(false);
    });

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = moment(selectedDate).format("YYYY-MM-DD");
      const filtered = ofertas.filter((oferta) => {
        const ofertaDate = moment(oferta.dataValidade, "YYYY-MM-DD").toDate();
        return moment(ofertaDate).isSame(formattedSelectedDate, "day");
      });
      setFilteredOfertas(filtered);
    }
  }, [selectedDate, ofertas]);

  const renderItem = ({ item }: { item: Ofertas }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Id: {item.id}</Text>
      <Text style={styles.title}>Nome: {item.nomeProduto}</Text>
      <Text style={styles.title}>Descrição: {item.descricaoProduto}</Text>
      <Text style={styles.title}>
        Preço Atual: R$ {parseFloat(item.precoAtual).toFixed(2)}
      </Text>
      <Text style={styles.title}>
        Preço Oferta: R$ {parseFloat(item.precoOferta).toFixed(2)}
      </Text>
      <Text style={styles.title}>
        Data de Validade da Oferta: {item.dataValidade}
      </Text>
    </View>
  );

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Selecionar Data das Ofertas"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {selectedDate && (
        <>
          <Text style={styles.title}>
            Ofertas do dia {moment(selectedDate).format("DD/MM/YYYY")}
          </Text>
          <FlatList
            data={filteredOfertas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.containerlistar}
            ListEmptyComponent={<Text>Não há ofertas para a data selecionada</Text>}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  containerlistar: {
    backgroundColor: "#ccc",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default ListarOfertas;
