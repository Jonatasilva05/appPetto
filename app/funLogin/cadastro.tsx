import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

const backgroundImage = require("@/assets/imagess/images/cenario-cachorro.jpg");

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados relacionados ao pet foram removidos
  // const [nomePet, setNomePet] = useState('');
  // const [raca, setRaca] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    // Validação simples no frontend
    if (!nome || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      // Envia apenas os dados do usuário para a API
      await axios.post(`${API_URL}/cadastro`, {
        nome,
        email,
        senha: password,
      });

      Alert.alert(
        'Sucesso!', 
        'Seu cadastro foi realizado. Agora você pode fazer o login.',
        [{ text: 'OK', onPress: () => router.push('/login') }]
      );

    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || 'Ocorreu um erro ao se cadastrar.');
      } else if (err.request) {
        setError('Não foi possível conectar ao servidor. Verifique o IP e a conexão.');
      } else {
        setError('Um erro inesperado ocorreu.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}> Petto </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.loginTitle}> Crie sua conta </Text>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Text style={styles.inputLabel}> Nome Completo </Text>
              <TextInput style={styles.input} placeholder="Seu nome" placeholderTextColor="#ccc" value={nome} onChangeText={setNome}/>

              <Text style={styles.inputLabel}> Email </Text>
              <TextInput style={styles.input} placeholder="email@exemplo.com" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

              <Text style={styles.inputLabel}> Senha </Text>
              <View style={styles.passwordContainer}>
                <TextInput style={styles.inputPassword} placeholder="Crie uma senha segura" placeholderTextColor="#ccc" value={password} onChangeText={setPassword} secureTextEntry={!mostrarSenha}/>
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icon}>
                  <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              {/* Campos do Pet foram removidos */}

              <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Cadastrando...' : 'Criar Conta'}</Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                  Já tem uma conta?{' '}
                  <Text style={styles.linkText} onPress={() => router.push('/login')}> Entrar </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

// Os estilos (styles) permanecem os mesmos da versão anterior.
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)', flex: 1 },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, paddingBottom: 80 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10 },
  backButton: { marginRight: 15 },
  title: { fontWeight: '500', color: '#1565C0', fontSize: 45 },
  content: { paddingHorizontal: 20, paddingTop: 25, flex: 1 },
  loginTitle: { fontWeight: 'bold', marginBottom: 25, color: '#fff', marginTop: 0, fontSize: 24 },
  inputLabel: { marginBottom: 10, color: '#fff', fontSize: 20 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 15, paddingVertical: 10, borderColor: '#ccc', borderRadius: 10, marginBottom: 15, borderWidth: 1, color: '#fff', fontSize: 16 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: '#ccc', borderRadius: 10, borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
  inputPassword: { flex: 1, color: '#fff', fontSize: 16, paddingVertical: 10 },
  icon: { paddingHorizontal: 8 },
  button: { backgroundColor: '#1565C0', alignItems: 'center', paddingVertical: 14, marginVertical: 8, borderRadius: 25 },
  buttonText: { fontWeight: '600', color: '#fff', fontSize: 18 },
  signUpTextContainer: { alignItems: 'center', marginTop: 30 },
  signUpText: { color: '#fff', fontSize: 16 },
  linkText: { textDecorationLine: 'underline', fontWeight: 'bold', color: 'dodgerblue', fontSize: 16 },
  errorText: { color: '#ff4d4d', textAlign: 'center', marginBottom: 15, fontSize: 16, fontWeight: 'bold' },
});
