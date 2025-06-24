import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const backgroundImage = require("@/assets/imagess/images/fundo_login2.jpeg");

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.logo}>Petto</Text>

            <View style={styles.quebra}></View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color="#ccc" style={styles.inputIcon} />
              <TextInput style={styles.input2} placeholder="E-mail" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.quebra}></View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#ccc" style={styles.inputIcon} />
              <TextInput style={styles.input2} placeholder="Senha" placeholderTextColor="#ccc" value={password} onChangeText={setPassword} secureTextEntry={!mostrarSenha} />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icon}>
                <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={ 30 } color="#ccc" />
              </TouchableOpacity>
            </View>
          </View>

            <View style={styles.quebra}></View>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/funLogin/cadastro')}>
            <Text style={styles.signUpText}>Não tem uma conta? <Text style={styles.linkText}>Cadastre-se</Text></Text>
          </TouchableOpacity>
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
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Poppins',
  },
  quebra: {
    height: 50,
  },
   inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
    fontSize: 30,
  },
  input2: {
    flex: 1,
    fontSize: 25,
    paddingVertical: 18,
    color: '#fff',
  },
  icon: {
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#274472',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 35,
    fontFamily: 'Poppins',
  },
  signUpText: {
    color: '#ccc',
    fontSize: 20,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  linkText: {
    color: '#395aff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
