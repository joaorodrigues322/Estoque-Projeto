import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManterProdutos from './ManterProdutos';
import ListarProdutos from './ListarProdutos';
import ProdutosEmFalta from './ProdutosEmFalta';
import Colaborador from './Colaborador';
import CadastrarOferta from './CadastrarOferta';
import ListarOferta from './ListarOfertas';

function ListarScreen({ navigation }) {
  return (
    <ListarProdutos></ListarProdutos>
  );
}
function ManterScreen({ navigation }) {
  return (
    <ManterProdutos></ManterProdutos>
  );
}

function ProdutosEmFaltaScreen({ navigation }) {
  return (
    <ProdutosEmFalta></ProdutosEmFalta>
  );
}

function ColaboradorScreen({ navigation }) {
  return (
    <Colaborador></Colaborador>
  );
}

function CadastrarOfertaScreen({ navigation }) {
  return (
    <CadastrarOferta></CadastrarOferta>
  );
}

function ListarOfertaScreen({ navigation }) {
  return (
    <ListarOferta></ListarOferta>
  );
}

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    <Drawer.Navigator initialRouteName="Produtos em Estoque">
      <Drawer.Screen name="Adicionar Produto" component={ManterScreen} />
      <Drawer.Screen name="Produtos em Estoque" component={ListarScreen} />
      <Drawer.Screen name="Produtos em falta" component={ProdutosEmFaltaScreen} />
      <Drawer.Screen name="Registro de Ofertas" component={CadastrarOfertaScreen} />
      <Drawer.Screen name="Ofertas Atuais" component={ListarOfertaScreen} />
      <Drawer.Screen name="Funcionário" component={ColaboradorScreen} />
    </Drawer.Navigator>
  );
}