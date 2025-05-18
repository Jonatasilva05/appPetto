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
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

const backgroundImage = { uri: 'https://blog.emania.com.br/wp-content/uploads/2016/07/25894.jpg' };

export default function EditProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState('Maicon Aparecido Pivetta');
  const [email, setEmail] = useState('maicon@example.com');
  const [clinic, setClinic] = useState('Clínica Petto Saúde Animal');

  function handleSave() {
    Alert.alert('Perfil atualizado!', 'Suas informações foram salvas com sucesso.');
    router.back();
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.title}>Editar Perfil</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                placeholderTextColor="#ccc"
                autoCapitalize="words"
                keyboardAppearance="dark"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu email"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize="none"
                keyboardAppearance="dark"
              />

              <Text style={styles.label}>Clínica</Text>
              <TextInput
                style={styles.input}
                value={clinic}
                onChangeText={setClinic}
                placeholder="Digite a clínica"
                placeholderTextColor="#ccc"
                autoCapitalize="words"
                keyboardAppearance="dark"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 60,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1565C0',
  },
  content: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 6,
    marginTop: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 16,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  saveButton: {
    marginTop: 40,
    backgroundColor: '#1565C0',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#1565C0',
    fontWeight: '600',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
