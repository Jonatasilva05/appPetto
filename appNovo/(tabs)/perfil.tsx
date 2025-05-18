import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  ImageBackground,
} from 'react-native';

import { useRouter } from 'expo-router';

const backgroundImage = require('@/assets/images/fundo.png');
const defaultPetImage = require('@/assets/images/fundo.png');

export default function EditarPerfilScreen() {
  const router = useRouter();

  const user = {
    name: 'Maicon Aparecido Pivetta',
    email: 'maicon@example.com',
    clinic: 'Clínica Petto Saúde Animal',
  };

  const pet = {
    name: 'Luna',
    species: 'Cachorro',
    breed: 'Golden Retriever',
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Petto</Text>
            <Text style={styles.welcome}>Bem-vindo ao</Text>
            <Text style={styles.welcome}>Editar Perfil</Text>
          </View>

          <View style={styles.photoContainer}>
            <Image source={defaultPetImage} style={styles.petPhoto} />
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.userClinic}>{user.clinic}</Text>
          </View>

          <View style={styles.petInfo}>
            <Text style={styles.petTitle}>Informações do Pet</Text>
            <Text style={styles.petDetail}>Nome: {pet.name}</Text>
            <Text style={styles.petDetail}>Espécie: {pet.species}</Text>
            <Text style={styles.petDetail}>Raça: {pet.breed}</Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={() => router.push('/editar-perfil')}
            >
              <Text style={styles.buttonText}>Editar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.historyButton]}
              onPress={() => router.push('/historico-vacinacao')}
            >
              <Text style={styles.buttonText}>Histórico de Vacinação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  container: {
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingHorizontal: 25,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingTop: 40,
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
    letterSpacing: 2,
    marginBottom: 0,
  },
  photoContainer: {
    marginBottom: 20,
  },
  petPhoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#4A90E2',
  },
  userInfo: {
    marginBottom: 25,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  userEmail: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 4,
  },
  userClinic: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 2,
    fontStyle: 'italic',
  },
  petInfo: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  petTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 12,
  },
  petDetail: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  editButton: {
    backgroundColor: '#4A90E2',
  },
  historyButton: {
    backgroundColor: '#1565C0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
