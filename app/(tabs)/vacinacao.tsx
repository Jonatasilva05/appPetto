import { StyleSheet, Animated, Dimensions, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

// --- Dados Fictícios (Mock Data) para a lista de vacinas ---
const vaccineHistory = [
  {
    id: '1',
    icon: 'checkmark-circle-outline',
    title: 'Vacina Polivalente (V8)',
    description: 'Aplicada em 15/01/2025',
    progress: 'OK',
    iconColor: '#28a745',
  },
  {
    id: '2',
    icon: 'shield-checkmark-outline',
    title: 'Anti-rábica',
    description: 'Aplicada em 20/02/2025',
    progress: 'OK',
    iconColor: '#007bff',
  },
  {
    id: '3',
    icon: 'notifications-outline',
    title: 'Verme',
    description: 'Próxima dose em 10/07/2025',
    progress: 'Próxima',
    iconColor: '#e74c3c',
  },
];


export default function ParallaxProfileScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  // EFEITO PARALAX PARA O FUNDO
  const backgroundTranslateY = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, screenHeight * 0.3], // Movimento mais sutil para o fundo
    extrapolate: 'clamp',
  });

  // FAZ O INDICADOR DE ROLAGEM DESAPARECER QUANDO O USUÁRIO COMEÇA A ROLAR
  const indicatorOpacity = scrollY.interpolate({
      inputRange: [0, 50], // Desaparece rapidamente nos primeiros 50px de rolagem
      outputRange: [1, 0],
      extrapolate: 'clamp',
  });

  // ANIMAÇÃO DE "PULAR" PARA O INDICADOR DE ROLAGEM
  useEffect(() => {
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -15,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();
    return () => bounceAnimation.stop();
  }, [bounceValue]);


  return (
    <View style={styles.container}>
      {/* IMAGEM DE FUNDO DO PET COM EFEITO PARALLAX */}
      <Animated.Image
        source={require('@/assets/imagess/images/cachorro.png')} // **COLOQUE A IMAGEM DO LABRADOR AQUI**
        style={[styles.backgroundImage, { transform: [{ translateY: backgroundTranslateY }] }]}
        resizeMode="cover"
      />

      {/* <Animated.Image
        source={require('@/assets/imagess/images/cachorro.png')}
        style={[styles.backgroundImage, { transform: [{ translateY: backgroundTranslateY }] }]}
        resizeMode="contain" 
      /> */}

      {/* INDICADOR VISUAL PARA ROLAR A TELA */}
      <Animated.View style={[styles.indicatorContainer, { opacity: indicatorOpacity, transform: [{ translateY: bounceValue }] }]}>
          <Text style={styles.indicatorText}>Arraste para cima</Text>
          <Ionicons name="chevron-up-outline" size={32} color="white" />
      </Animated.View>

      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* CONTEÚDO DO PERFIL QUE APARECE AO ROLAR */}
        <View style={styles.contentContainer}>
          {/* Nome do Pet no topo */}
          <Text style={styles.petName}>Chocolate</Text>

          {/* Seção "Datos do Pet" */}
          <View style={styles.detailsSection}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Dados do Pet </Text>
                <TouchableOpacity>
                    <Ionicons name="sparkles-outline" size={20} color="#666" />
                </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
              <View style={styles.tag}><Text style={styles.tagText}>Espécie: Cão </Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Raça: Labrador </Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Idade: 3 anos </Text></View>
            </ScrollView>
          </View>

          {/* Card "Histórico de Vacinas" */}
          <View style={styles.vaccineCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Histórico de Vacinas</Text>
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {vaccineHistory.map((item) => (
              <View key={item.id} style={styles.vaccineItem}>
                <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
                    <Ionicons name={item.icon as any} size={22} color="white" />
                </View>
                <View style={styles.vaccineInfo}>
                  <Text style={styles.vaccineTitle}>{item.title}</Text>
                  <Text style={styles.vaccineDescription}>{item.description}</Text>
                </View>
                <Text style={styles.vaccineProgress}>{item.progress}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fundo preto para o container principal
  },
  backgroundImage: {
    height: screenHeight, // Ocupa a tela inteira inicialmente
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 100, // Posicionado na parte de baixo da tela
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 10, // Garante que fique sobre a imagem
  },
  indicatorText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  contentContainer: {
    marginTop: screenHeight, // Empurra o conteúdo para baixo, para fora da tela
    padding: 20,
    backgroundColor: '#F4F6F6', // Cor de fundo do conteúdo
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: screenHeight, // Garante que o conteúdo preencha a tela
  },
  petName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A2E35',
    marginBottom: 24,
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A2E35',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#DDEAEA',
  },
  tagText: {
    fontSize: 14,
    color: '#58707A',
  },
  vaccineCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A2E35',
  },
  vaccineDescription: {
    fontSize: 13,
    color: '#58707A',
  },
  vaccineProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A2E35',
  },
});