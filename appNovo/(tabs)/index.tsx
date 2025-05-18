import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const backgroundImage = require('@/assets/images/fundo.png'); // Ajuste o caminho se necessário

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Petto</Text>
          <Text style={styles.welcome}>Bem-vindo ao</Text>
          <Text style={styles.welcome}>Petto</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.introTitle}>Seu app de cuidado pet</Text>
          <Text style={styles.introText}>
            Gerencie a saúde e vacinação dos seus pets de forma prática e segura.
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/entrar')} // Navegação pelo router
          >
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    backgroundColor: 'transparent',
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1565C0',
    marginBottom: 0,
  },
  welcome: {
    fontSize: 30,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'left',
    letterSpacing: 2,
    marginBottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  introTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    color: '#fff',
  },
  introText: {
    fontSize: 18,
    color: '#eee',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#1565C0',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
