import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, API_URL } from '@/app/context/AuthContext'; // Verifique o caminho
import { jwtDecode } from 'jwt-decode';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter, useFocusEffect } from 'expo-router';

// --- Interfaces e Componente PetCard (sem alterações) ---
interface Pet { id: string; name: string; breed: string; imageUrl: string | null; }
interface DecodedToken { id: number; nome: string; email: string; }
const PetCard = ({ pet, onDelete }: { pet: Pet; onDelete: (petId: string) => void; }) => {
  const handleOptionsPress = () => { Alert.alert(`Opções para ${pet.name}`, 'O que fazer?', [{ text: 'Editar' }, { text: 'Deletar', onPress: () => confirmDelete(), style: 'destructive' }, { text: 'Cancelar', style: 'cancel' }]); };
  const confirmDelete = () => { Alert.alert('Confirmar Exclusão', `Tem certeza que deseja deletar ${pet.name}?`, [{ text: 'Sim', onPress: () => onDelete(pet.id), style: 'destructive' }, { text: 'Não', style: 'cancel' }]); };
  return (
    <TouchableOpacity style={styles.petCardContainer} activeOpacity={0.8}>
      <Image source={pet.imageUrl ? { uri: pet.imageUrl } : require('@/assets/imagess/images/cachorro.png')} style={styles.petImage} />
      <View style={styles.petInfoContainer}>
        <Text style={styles.petNameText}>{pet.name}</Text>
        <Text style={styles.petBreedText}>{pet.breed}</Text>
      </View>
      <TouchableOpacity onPress={handleOptionsPress} style={styles.optionsButton}><Ionicons name="ellipsis-vertical" size={22} color="#A9B4BC" /></TouchableOpacity>
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (session) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(session);
        setTutorName(decodedToken.nome);
      } catch (e) { setTutorName("Tutor"); }
    }
  }, [session]);

  const fetchPets = useCallback(async () => {
    if (!session) return;
    try {
      const response = await axios.get(`${API_URL}/pets`);
      const formattedPets = response.data.map((p: any) => ({
        id: p.id_pet.toString(), name: p.nome, breed: p.raca, imageUrl: p.foto_url,
      }));
      setPets(formattedPets);
    } catch (e: any) {
      console.error('Erro ao buscar pets:', e.response?.data?.message || e.message);
      Alert.alert('Erro de Conexão', 'Não foi possível carregar os pets.');
    }
  }, [session]);
  
  useFocusEffect(useCallback(() => { setIsLoading(true); fetchPets().finally(() => setIsLoading(false)); }, [fetchPets]));
  const onRefresh = useCallback(() => { setIsRefreshing(true); fetchPets().finally(() => setIsRefreshing(false)); }, [fetchPets]);

  const handleDeletePet = async (petId: string) => {
    try {
      await axios.delete(`${API_URL}/pets/${petId}`);
      setPets(currentPets => currentPets.filter(p => p.id !== petId));
      Alert.alert('Sucesso', 'Pet deletado com sucesso!');
    } catch (err: any) {
      Alert.alert('Erro', 'Não foi possível deletar o pet.');
    }
  };

  if (isLoading) {
    return (<View style={[styles.container, styles.centered]}><ActivityIndicator size="large" color="#4890F0" /></View>);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PetCard pet={item} onDelete={handleDeletePet} />}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#4890F0" />}
        ListHeaderComponent={<Text style={styles.headerText}>Olá, {tutorName}!</Text>}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image source={require('@/assets/imagess/images/cachorro.png')} style={styles.emptyImage} />
            <Text style={styles.emptyTitle}>Nenhum pet por aqui</Text>
            <Text style={styles.emptySubtitle}>Vamos registar o seu primeiro amigo?</Text>
            {/* CORREÇÃO: Usando caminho absoluto para a rota */}
            <TouchableOpacity style={styles.emptyButton} onPress={() => router.push('/funLogin/cadastrarPet')}>
              <Text style={styles.emptyButtonText}>Registar primeiro pet</Text>
            </TouchableOpacity>
          </View>
        }
      />
      {pets.length > 0 && (
        // CORREÇÃO: Usando caminho absoluto para a rota
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/funLogin/cadastrarPet')}>
          <Ionicons name="add" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContentContainer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  headerText: { fontSize: 32, fontWeight: '700', color: '#0D294F', marginBottom: 24 },
  petCardContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F7F8FA', padding: 12, borderRadius: 16, marginVertical: 8, },
  petImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16, backgroundColor: '#E9EEF3', },
  petInfoContainer: { flex: 1 },
  petNameText: { fontSize: 18, fontWeight: '600', color: '#0D294F', },
  petBreedText: { fontSize: 14, color: '#7A8C99', marginTop: 4, },
  optionsButton: { padding: 8 },
  fab: { position: 'absolute', right: 20, bottom: 40, backgroundColor: '#4890F0', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 8 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 20 },
  emptyImage: { width: 180, height: 180, resizeMode: 'contain' },
  emptyTitle: { fontSize: 22, fontWeight: '700', color: '#0D294F', marginTop: 24 },
  emptySubtitle: { fontSize: 16, color: '#7A8C99', marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
  emptyButton: { backgroundColor: '#4890F0', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 100, marginTop: 24 },
  emptyButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
