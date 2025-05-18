import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { useRouter } from 'expo-router';

const backgroundImage = require('@/assets/images/fundo.png');

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Petto</Text>
            <Text style={styles.welcome}>Bem-vindo</Text>
            <Text style={styles.welcome}>ao Petto</Text>
          </View>

          <View style={styles.content}>
            <Text style={styles.loginTitle}>Entrar</Text>

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@exemplo.com"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <View style={styles.signUpTextContainer}>
              <Text style={styles.signUpText}>
                Ainda não tem uma conta?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => router.push('/cadastro')}  // uso do router.push
                >
                  Cadastre-se
                </Text>
              </Text>
            </View>
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1565C0',
  },
  welcome: {
    fontSize: 30,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 16,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpTextContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#fff',
  },
  linkText: {
    fontSize: 16,
    color: '#1565C0',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
