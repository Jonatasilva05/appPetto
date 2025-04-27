import { StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link, router } from 'expo-router';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useState } from 'react';

// Icones
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const exibirSenhaDigitada = () => {
    setVerSenha(!verSenha);
  }

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const login = async () => {
    try {
      if(usuario === 'jhon' && senha === '123456') {
        alert('Bem-vindo(a) ao Petto ' + usuario);
        router.replace('/(tabs)')
      } else {
        alert('Usuario ou Senha incorretos tente novamente')
      }
    } catch(err: any) {
      alert('Erro: ' + err.message);
    }
  }

  return (
    <View style={ styles.container }>

      <Text style={ styles.h1Title }> Faça Seu Login no Petto </Text>

      {/* QUEBRA DE LINHA */}
      <Text style={ styles.quebraLinha }></Text>

      {/* PRIMEIRO INPUT DA TELA DE LOGIN */}
      <View>
        <Text style={ styles.viewText }>Usuário: </Text>
        <Text style={ styles.quebraLinha }></Text>
        <TextInput style={ styles.textInput } placeholder='Digite seu Usuario...' placeholderTextColor="#D3D3D3" onChangeText={setUsuario} />
      </View>

        {/* QUEBRA DE LINHA */}
        <Text style={ styles.quebraLinha }></Text>

      {/* SEGUNDO INPUT DA TELA DE LOGIN */}
      <View>
        <Text style={ styles.viewText }>Senha: </Text>
        <Text style={ styles.quebraLinha }></Text>
        <TextInput style={ styles.textInput } placeholder='Digite sua Senha...' placeholderTextColor="#D3D3D3" secureTextEntry={!verSenha} onChangeText={setSenha}/>
        <TouchableOpacity onPress={exibirSenhaDigitada} style={ styles.iconCont }>
          <Ionicons name={ verSenha ? 'eye-off' : 'eye' } size={24} color="black"></Ionicons>
        </TouchableOpacity>
      </View>

      {/* QUEBRA DE LINHA */}
      <Text style={ styles.quebraLinha }></Text>

      <View>
        <TouchableOpacity style={ styles.button } onPress={login}>
          <Text style={ styles.corText }> Entrar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1Title :{
    fontSize: 30,
  },
  viewText: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    width: 150,
  },
  quebraLinha: {
    backgroundColor: 'transparent',
    height: 50,
  },
  iconCont: {
    position: 'absolute',
    right: -30,
    top: 86,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corText: {
    color: 'white',
  },
});