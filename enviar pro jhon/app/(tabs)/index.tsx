import { useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0f172a', '#1e1b4b', '#0f172a']}
      start={{ x: 0.1, y: 0.2 }}
      end={{ x: 0.9, y: 0.9 }}
      style={styles.gradient}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Image
            source={require('@/assets/images/petto-branco.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <ThemedText type="title" style={styles.title}>
            Bem-vindo ao Petto!
          </ThemedText>

          <ThemedText type="default" style={styles.subtitle}>
            O app ideal para cuidar e controlar a vacinação dos seus pets.
          </ThemedText>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login' as never)}
            activeOpacity={0.85}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#3b82f6', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Entrar
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  keyboardContainer: { flex: 1, justifyContent: 'center' },
  container: {
    padding: 32,
    gap: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  logo: { width: 140, height: 140, marginBottom: 24 },
  title: {
    color: '#E2E8F0',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 18,
    marginBottom: 36,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  buttonWrapper: { width: '100%' },
  button: {
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 7,
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 22 },
});
