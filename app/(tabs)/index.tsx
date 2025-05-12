import { StyleSheet, Animated, Dimensions, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRef } from 'react';
import LottieView from 'lottie-react-native';

const { height: screenHeight } = Dimensions.get('window');

export default function TabFourScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Efeito parallax para o fundo
  const translateY = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, -100], // quanto a imagem de fundo se move
    extrapolate: 'clamp',
  });

  // Interpolação para animar a opacidade da animação Lottie
  const animationOpacity = scrollY.interpolate({
    inputRange: [0, screenHeight * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // A animação de parallax e a animação Lottie vão "sumir" quando o conteúdo aparecer
  const lottieTranslateY = scrollY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [0, -200], // Move a animação para cima à medida que o usuário rola
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Imagem de fundo com efeito parallax */}
      <Animated.Image
        source={{ uri: 'https://blog.emania.com.br/wp-content/uploads/2016/07/25894.jpg' }}
        style={[styles.backgroundImage, { transform: [{ translateY }] }]}
        resizeMode="cover"
      />

      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Parallax com Animação Lottie</Text>
          <Text style={styles.description}>
            Ao rolar, o fundo se move mais devagar que o conteúdo, e a animação Lottie começa ao rolar.
            Ela desaparece conforme o conteúdo aparece e reaparece com a imagem.
          </Text>
        </View>
      </Animated.ScrollView>

      {/* Animação Lottie com opacidade e movimento controlado pela rolagem */}
      <Animated.View
        style={[
          styles.animationContainer,
          {
            opacity: animationOpacity,
            transform: [{ translateY: lottieTranslateY }],
          },
        ]}
      >
        <LottieView
          source={require('@/assets/images/json/dog.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  backgroundImage: {
    height: screenHeight * 1.1,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    marginTop: screenHeight,
    padding: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: screenHeight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
  },
  animationContainer: {
    position: 'absolute',
    top: screenHeight * 0.3,
    left: '20%',
    transform: [{ translateX: -150 }],
  },
  animation: {
    width: 300,
    height: 300,
  },
});