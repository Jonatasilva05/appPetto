import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Dados Fictícios (Mock Data) ---
// No futuro, você pode substituir isso por dados vindos do seu banco de dados ou API.
const mockPets = [
  {
    id: '1',
    name: 'Buddy',
    breed: 'Golden Retriever',
    imageUrl: require('@/assets/imagess/images/cachorro.png'), // Substitua pelo caminho real da sua imagem
  },
  {
    id: '2',
    name: 'Bella',
    breed: 'Doméstic shorthair',
    imageUrl: require('@/assets/imagess/images/cachorro.png'), // Substitua pelo caminho real da sua imagem
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'Beagle',
    imageUrl: require('@/assets/imagess/images/cachorro.png'), // Substitua pelo caminho real da sua imagem
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'French Bulldog',
    imageUrl: require('@/assets/imagess/images/cachorro.png'), // Substitua pelo caminho real da sua imagem
  },
];

// --- Componente Reutilizável para o Card de cada Pet ---
const PetCard = ({ pet }: { pet: typeof mockPets[0] }) => {
  return (
    <TouchableOpacity style={styles.petCardContainer}>
      <Image source={pet.imageUrl} style={styles.petImage} />
      <View style={styles.petInfoContainer}>
        <Text style={styles.petNameText}>{pet.name}</Text>
        <Text style={styles.petBreedText}>{pet.breed}</Text>
      </View>
    </TouchableOpacity>
  );
};

// --- Tela Principal que Renderiza a Lista ---
export default function PetListScreen() {
  const tutorName = "Usuário"; // Você pode buscar o nome do tutor logado aqui

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Olá, {tutorName}!</Text>
      </View>

      <FlatList
        data={mockPets}
        renderItem={({ item }) => <PetCard pet={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// --- Estilos para a Tela ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F6', // Um fundo branco levemente acinzentado
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A2E35', // Azul escuro, como na imagem
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  petCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
    // Sombra para dar o efeito de elevação
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  petImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Metade da largura/altura para ser um círculo perfeito
    marginRight: 15,
  },
  petInfoContainer: {
    flex: 1,
  },
  petNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2E35',
  },
  petBreedText: {
    fontSize: 14,
    color: '#6c757d', // Cinza para o texto da raça
    marginTop: 4,
  },
});