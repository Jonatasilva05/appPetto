import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
// Verifique se o caminho para o seu AuthContext está correto
import { useAuth, API_URL } from '@/app/context/AuthContext';

const backgroundImage = require("@/assets/imagess/images/fundo_login2.jpeg");

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      // CORREÇÃO: A URL agora aponta para a rota de autenticação correta
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        senha: password,
      });
      signIn(response.data.token);
      // O redirecionamento é feito automaticamente pelo AuthContext

    } catch (err: any) {
       if (err.response) {
         setError(err.response.data.message || 'Ocorreu um erro ao tentar entrar.');
       } else if (err.request) {
         setError('Não foi possível conectar ao servidor. Verifique a API.');
         Alert.alert('Erro de Conexão', 'Certifique-se de que o IP no código está correto e que a API está a funcionar.');
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
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.quebra}></View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Entrando... ' : 'Entrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/funLogin/cadastro')}>
            <Text style={styles.signUpText}>Não tem uma conta? <Text style={styles.linkText}>Registe-se</Text></Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  container: { width: '100%', maxWidth: 400, alignItems: 'center' },
  content: { alignItems: 'center', width: '100%' },
  logo: { fontSize: 55, fontWeight: 'bold', color: '#fff', marginBottom: 40, fontFamily: 'Poppins' },
  quebra: { height: 50 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 12, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 10, width: '100%', marginBottom: 15 },
  inputIcon: { marginRight: 10, fontSize: 30 },
  input2: { flex: 1, fontSize: 25, paddingVertical: 18, color: '#fff' },
  icon: { paddingLeft: 10 },
  button: { backgroundColor: '#274472', borderRadius: 30, paddingVertical: 15, paddingHorizontal: 40, marginBottom: 30, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 35, fontFamily: 'Poppins' },
  signUpText: { color: '#ccc', fontSize: 20, fontFamily: 'Poppins', textAlign: 'center' },
  linkText: { color: '#395aff', fontWeight: 'bold', textDecorationLine: 'underline' },
  errorText: { color: '#ff4d4d', textAlign: 'center', marginVertical: 10, fontSize: 16, fontWeight: 'bold' }
});
