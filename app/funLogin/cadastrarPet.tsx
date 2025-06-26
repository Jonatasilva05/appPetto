// app/funLogin/cadastrarPet.tsx
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
// Importe a URL da API do seu contexto de autenticação
import { API_URL } from '@/app/context/AuthContext';

export default function CadastrarPetScreen() {
  // Estados para os campos do formulário do pet
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função que será chamada ao pressionar o botão de cadastrar
  const handleRegisterPet = async () => {
    if (loading) return;
    setLoading(true);
    setError('');

    // Validação simples para garantir que os campos não estão vazios
    if (!nome || !especie || !raca || !idade) {
      setError('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }

    try {
      // Fazendo a requisição POST para a rota correta da API
      // A rota /api/pets/ já está protegida e exige um token,
      // o Axios (configurado no AuthContext) já envia o token automaticamente.
      await axios.post(`${API_URL}/pets`, {
        nome,
        especie,
        raca,
        idade: parseInt(idade, 10), // A API espera um número para a idade
      });

      Alert.alert(
        'Sucesso!',
        `${nome} foi cadastrado com sucesso!`,
        // Botão OK que, ao ser pressionado, volta para a tela anterior (a lista de pets)
        [{ text: 'OK', onPress: () => router.back() }]
      );

    } catch (err: any) {
      if (err.response) {
        // Mostra a mensagem de erro que vem da API
        setError(err.response.data.message || 'Ocorreu um erro ao cadastrar o pet.');
      } else {
        setError('Não foi possível conectar ao servidor. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={30} color="#333" />
              </TouchableOpacity>
              <Text style={styles.title}>Cadastrar Novo Pet</Text>
            </View>

            <View style={styles.form}>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Text style={styles.inputLabel}>Nome do Pet</Text>
              <TextInput style={styles.input} placeholder="Ex: Chocolate" value={nome} onChangeText={setNome} />

              <Text style={styles.inputLabel}>Espécie</Text>
              <TextInput style={styles.input} placeholder="Ex: Cão, Gato" value={especie} onChangeText={setEspecie} />

              <Text style={styles.inputLabel}>Raça</Text>
              <TextInput style={styles.input} placeholder="Ex: Labrador, Siamês" value={raca} onChangeText={setRaca} />

              <Text style={styles.inputLabel}>Idade (anos)</Text>
              <TextInput style={styles.input} placeholder="Ex: 3" value={idade} onChangeText={setIdade} keyboardType="number-pad" />
              
              <TouchableOpacity style={styles.button} onPress={handleRegisterPet} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar Pet</Text>
                )}
              </TouchableOpacity>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// Estilos para a nova tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F6',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A2E35',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  inputLabel: {
    marginBottom: 8,
    color: '#58707A',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDEAEA',
  },
  button: {
    backgroundColor: '#1565C0',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});