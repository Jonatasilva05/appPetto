// Caminho: app/(tabs)/cadastrarPet.tsx
import React, { useState, useMemo } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ImageBackground, KeyboardAvoidingView, Platform, Alert,
  ScrollView, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';


import { API_URL } from '@/app/context/AuthContext';
import { PET_DATA } from '@/data/databasePets'; 

const backgroundImage = require("@/assets/imagess/images/cachorro.png");

export default function CadastrarPetScreen() {
  const router = useRouter();
  const [etapa, setEtapa] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');

  
  const especiesDisponiveis = useMemo(() => {
    return PET_DATA.map(s => ({ label: s.label, value: s.value }));
  }, []);

  // Pega as raças da espécie selecionada
  const racasDisponiveis = useMemo(() => {
    const especieSelecionada = PET_DATA.find(s => s.value === especie);
    return especieSelecionada ? especieSelecionada.breeds : [];
  }, [especie]);


  // (O restante do seu arquivo continua igual: proximaEtapa, etapaAnterior, handleFinalizarCadastro)
  const proximaEtapa = () => {
    if (etapa === 1 && !nome.trim()) {
        Alert.alert('Atenção', 'Por favor, insira o nome do seu pet.');
        return;
    }
    if (etapa === 2 && !especie) {
        Alert.alert('Atenção', 'Por favor, selecione uma espécie.');
        return;
    }
    if (etapa === 3 && !raca) {
        Alert.alert('Atenção', 'Por favor, selecione uma raça.');
        return;
    }
    setEtapa(etapa + 1);
  };

  const etapaAnterior = () => {
    if (etapa > 1) {
        setEtapa(etapa - 1);
    }
  };
  
  const handleFinalizarCadastro = async () => {
    if (!idade.trim() || isNaN(parseInt(idade, 10))) {
        Alert.alert('Atenção', 'Por favor, informe uma idade válida para o pet.');
        return;
    }
    setIsLoading(true);
    try {
        await axios.post(`${API_URL}/pets`, {
            nome,
            especie,
            raca,
            idade: parseInt(idade, 10),
        });
        Alert.alert(
          'Sucesso!',
          `${nome} foi cadastrado com sucesso.`,
          [{ text: 'OK', onPress: () => router.replace('/(tabs)') }] // Redireciona para a home
        );
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Não foi possível cadastrar o pet.';
        Alert.alert('Erro no Cadastro', errorMessage);
    } finally {
        setIsLoading(false);
    }
  };

  const renderEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <Text style={styles.inputLabel}>Qual o nome do seu pet?</Text>
            <TextInput style={styles.input} placeholder="Ex: Bob" placeholderTextColor="#ccc" value={nome} onChangeText={setNome} />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.inputLabel}>Qual é a espécie?</Text>
            <View style={styles.pickerContainer}>
              {/* ✅ PASSO 3: ATUALIZE O PICKER DE ESPÉCIES */}
              <Picker selectedValue={especie} onValueChange={(itemValue) => setEspecie(itemValue)} style={styles.picker}>
                <Picker.Item label="Selecione a espécie..." value="" />
                {especiesDisponiveis.map(e => <Picker.Item key={e.value} label={e.label} value={e.value} />)}
              </Picker>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.inputLabel}>E a raça?</Text>
            <View style={styles.pickerContainer}>
              {/* ✅ PASSO 4: ATUALIZE O PICKER DE RAÇAS */}
              <Picker selectedValue={raca} onValueChange={(itemValue) => setRaca(itemValue)} style={styles.picker} enabled={racasDisponiveis.length > 0}>
                <Picker.Item label={racasDisponiveis.length > 0 ? "Selecione a raça..." : "Nenhuma raça disponível"} value="" />
                {racasDisponiveis.map(r => <Picker.Item key={r.value} label={r.label} value={r.value} />)}
              </Picker>
            </View>
          </>
        );
    case 4:
        return (
            <>
                <Text style={styles.inputLabel}>Idade do pet (em anos)</Text>
                <TextInput style={styles.input} placeholder="Ex: 5" placeholderTextColor="#ccc" value={idade} onChangeText={setIdade} keyboardType="numeric" />
            </>
        );
      default:
        return null;
    }
  };

  // (O restante do seu return e os styles continuam exatamente os mesmos)
  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Cadastro do Pet</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${(etapa / 4) * 100}%` }]} />
            </View>
            <View style={styles.content}>
                {renderEtapa()}
            </View>
            <View style={styles.botoesContainer}>
                {etapa > 1 && (
                    <TouchableOpacity style={[styles.button, styles.buttonVoltar]} onPress={etapaAnterior}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                )}
                {etapa < 4 ? (
                    <TouchableOpacity style={[styles.button, styles.buttonAvancar]} onPress={proximaEtapa}>
                        <Text style={styles.buttonText}>Avançar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.button, styles.buttonFinalizar]} onPress={handleFinalizarCadastro} disabled={isLoading}>
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Finalizar Cadastro</Text>}
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.75)' },
    container: { flex: 1 },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', paddingBottom: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        color: 'dodgerblue',
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        flex: 1,
        marginRight: 70, // Ajuste para centralizar o título
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        marginHorizontal: 20,
        marginBottom: 40,
    },
    progressBar: {
        height: '100%',
        backgroundColor: 'dodgerblue',
        borderRadius: 4,
    },
    content: { paddingHorizontal: 20, minHeight: 150 },
    inputLabel: { color: '#fff', fontSize: 28, marginBottom: 15, fontWeight: '300' },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#fff',
        fontSize: 22,
        marginBottom: 20,
    },
    pickerContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
    },
    picker: { height: Platform.OS === 'ios' ? 180 : 60, width: '100%' },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 25,
        flex: 1,
        justifyContent: 'center',
    },
    buttonVoltar: { backgroundColor: '#6c757d', marginRight: 10 },
    buttonAvancar: { backgroundColor: '#1565C0', marginLeft: 10 },
    buttonFinalizar: { backgroundColor: '#28a745', marginLeft: 10 },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 18 },
});