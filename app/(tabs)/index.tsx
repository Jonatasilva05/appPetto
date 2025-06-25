import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, API_URL } from '@/app/context/AuthContext'; // Verifique se o caminho para seu AuthContext está correto
import { jwtDecode } from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';

// --- Interfaces para Tipagem ---
interface Pet {
  id: string;
  name: string;
  breed: string;
  imageUrl: string | null;
}

interface DecodedToken {
  id: number;
  nome: string;
  email: string;
}

// --- Componente do Card do Pet (Estilo Atualizado) ---
const PetCard = ({ pet, onDelete }: { pet: Pet; onDelete: (petId: string) => void; }) => {
  const router = useRouter();

  const handleOptionsPress = () => {
    Alert.alert(
      `Opções para ${pet.name}`,
      'O que você gostaria de fazer?',
      [
        {
          text: 'Editar Pet',
          onPress: () => router.push('/(tabs)/edit-pet'), // Ação de editar (futura)
        },
        {
          text: 'Deletar Pet',
          onPress: () => confirmDelete(),
          style: 'destructive',
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja deletar ${pet.name}? Esta ação não pode ser desfeita.`,
      [
        { text: 'Sim, Deletar', onPress: () => onDelete(pet.id), style: 'destructive' },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.petCardContainer} activeOpacity={0.8}>
      <Image
        source={pet.imageUrl ? { uri: pet.imageUrl } : require('@/assets/imagess/images/cachorro.png')}
        style={styles.petImage}
      />
      <View style={styles.petInfoContainer}>
        <Text style={styles.petNameText}>{pet.name}</Text>
        <Text style={styles.petBreedText}>{pet.breed}</Text>
      </View>
      <TouchableOpacity onPress={handleOptionsPress} style={styles.optionsButton}>
        <Ionicons name="ellipsis-vertical" size={22} color="#A9B4BC" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// --- Tela Principal ---
export default function PetListScreen() {
  const { session } = useAuth();
  const router = useRouter();
  const [tutorName, setTutorName] = useState('');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Decodifica o token para pegar o nome do usuário
  useEffect(() => {
    if (session) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(session);
        setTutorName(decodedToken.nome);
      } catch (e) {
        console.error("Erro ao decodificar token:", e);
        setTutorName("Tutor");
      }
    }
  }, [session]);

  // Busca os pets do usuário na API
  const fetchPets = useCallback(async () => {
    if (!session) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/pets`);
      const formattedPets = response.data.map((p: any) => ({
        id: p.id_pet.toString(), // Corrigido para `id_pet` do seu banco de dados
        name: p.nome,
        breed: p.raca,
        imageUrl: p.foto_url, // Corrigido para `foto_url` da sua API
      }));
      setPets(formattedPets);
    } catch (e: any) {
      console.error('Erro ao buscar pets:', e.response?.data?.message || e.message);
      Alert.alert('Erro de Conexão', 'Não foi possível carregar os pets. Verifique a API e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  // Deleta um pet
  const handleDeletePet = async (petId: string) => {
    try {
      await axios.delete(`${API_URL}/pets/${petId}`);
      setPets(currentPets => currentPets.filter(p => p.id !== petId));
      Alert.alert('Sucesso', 'Pet deletado com sucesso!');
    } catch (err: any) {
      console.error("Erro ao deletar pet:", err.response?.data?.message || err.message);
      Alert.alert('Erro', 'Não foi possível deletar o pet.');
    }
  };

  // Renderiza o indicador de carregamento
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#4890F0" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PetCard pet={item} onDelete={handleDeletePet} />}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.headerText}>Olá, {tutorName}!</Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image source={require('@/assets/imagess/images/cachorro.png')} style={styles.emptyImage} />
            <Text style={styles.emptyTitle}>Nenhum pet por aqui </Text>
            <Text style={styles.emptySubtitle}>Vamos cadastrar o seu primeiro amigo? </Text>
            <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/(tabs)/add-pet')}>
              <Text style={styles.emptyButtonText}>Cadastrar primeiro pet</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {/* Botão flutuante para adicionar mais pets, só aparece se já existir algum */}
      {pets.length > 0 && (
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/(tabs)/add-pet')}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// --- Folha de Estilos (Recriada com base na imagem) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10, // Espaço no topo
    paddingBottom: 100, // Espaço na base para o FAB não cobrir o último item
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700', // Semibold/Bold
    color: '#0D294F', // Azul escuro
    marginBottom: 24, // Espaço entre o título e a lista
  },
  // Card do Pet
  petCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FA', // Fundo do card levemente cinza
    padding: 12,
    borderRadius: 16,
    marginVertical: 8,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Metade da largura/altura para ser um círculo perfeito
    marginRight: 16,
    backgroundColor: '#E9EEF3',
  },
  petInfoContainer: {
    flex: 1, // Ocupa o espaço restante
  },
  petNameText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0D294F',
  },
  petBreedText: {
    fontSize: 14,
    color: '#7A8C99', // Cinza para a raça
    marginTop: 4,
  },
  optionsButton: {
    padding: 8,
  },
  // Botão Flutuante (FAB)
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    backgroundColor: '#4890F0', // Azul principal
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4890F0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  // Estilos para quando a lista está vazia
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80, // Empurra o conteúdo para baixo
  },
  emptyImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0D294F',
    marginTop: 24,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#7A8C99',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emptyButton: {
    backgroundColor: '#4890F0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 100,
    marginTop: 24,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});