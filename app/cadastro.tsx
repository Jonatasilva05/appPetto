import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';


const backgroundImage = { uri: 'https://blog.emania.com.br/wp-content/uploads/2016/07/25894.jpg' } 

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [raca, setRaca] = useState('');
  const [pelo, setPelo] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.title}> Petto </Text>
              <Text style={styles.welcome}> Junte-se à Petto hoje </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.loginTitle}> Cadastre-se </Text>

              <Text style={styles.inputLabel}> Nome </Text>
              <TextInput style={styles.input} placeholder="Digite seu nome completo..." placeholderTextColor="#ccc" value={nome} onChangeText={setNome}/>

              <Text style={styles.inputLabel}> Email </Text>
              <TextInput style={styles.input} placeholder="email@exemplo.com" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

              <Text style={styles.inputLabel}> Senha </Text>
              <View style={styles.passwordContainer}>
                <TextInput style={styles.inputPassword} placeholder="Crie uma senha" placeholderTextColor="#ccc" value={password} onChangeText={setPassword} secureTextEntry={!mostrarSenha}/>
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icon}>
                  <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            
              <Text style={styles.inputLabel}> Data de Nascimento </Text>
              <TextInput style={styles.input} placeholder="Troque por input de data" placeholderTextColor="#ccc" />

              <Text style={styles.inputLabel}> Nome do seu Pet </Text>
              <TextInput style={styles.input} placeholder="Digite o nome do seu Pet..." placeholderTextColor="#ccc"/>

              <Text style={styles.inputLabel}> Raça do seu Pet </Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={raca} onValueChange={(itemValue) => setRaca(itemValue)} style={styles.picker} dropdownIconColor="#fff">
                  <Picker.Item label="Selecione uma raça..." value="" color="#aaa" />
                  <Picker.Item label="Labrador" value="labrador" />
                  <Picker.Item label="Poodle" value="poodle" />
                  <Picker.Item label="Bulldog" value="bulldog" />
                  <Picker.Item label="Vira-lata" value="viralata" />
                  <Picker.Item label="Persa" value="persa" />
                  <Picker.Item label="Siamês" value="siames" />
                </Picker>
              </View>
              
              <Text style={styles.inputLabel}> Raça do seu Pet </Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={pelo} onValueChange={(itemValue) => setPelo(itemValue)} style={styles.picker} dropdownIconColor="#fff">
                  <Picker.Item label="Selecione o tipo do pelo de seu pet..." value="" color="#aaa" />
                  <Picker.Item label="liso" value="liso" />
                  <Picker.Item label="enrolado" value="enrolado" />
                  <Picker.Item label="grosso" value="grosso" />
                  <Picker.Item label="cacheado" value="cacheado" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Cadastrar </Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                  Já tem uma conta?
                  <Text style={styles.linkText} onPress={() => router.push('/(tabs)/login')}> Entrar </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
  flexGrow: 1,
  paddingBottom: 80,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontWeight: '500',
    color: '#1565C0',
    fontSize: 45,
  },
  welcome: {
    fontWeight: '300',
    letterSpacing: 2,
    color: '#fff',
    fontSize: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    flex: 1,
  },
  loginTitle: {
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff',
    marginTop: 0,
    fontSize: 24,
  },
  inputLabel: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1565C0',
    alignItems: 'center',
    paddingVertical: 14,
    marginVertical: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 18,
  },
  pickerContainer: {
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderColor: '#ccc',
  marginBottom: 15,
  borderRadius: 10,
  borderWidth: 1,
  },
  picker: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  signUpTextContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#1565C0',
    fontSize: 16,
  },
});