import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCadastro = () => {
    alert('Cadastro realizado com sucesso!');
  };

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
            Criar sua conta Petto
          </ThemedText>

          <InputField
            icon="person-outline"
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
          />
          <InputField
            icon="mail-outline"
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <InputField
            icon="lock-closed-outline"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          <TouchableOpacity
            onPress={handleCadastro}
            activeOpacity={0.8}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={['#3b82f6', '#6366f1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.button}
            >
              <ThemedText type="defaultSemiBold" style={styles.buttonText}>
                Cadastrar
              </ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
}: any) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name={icon} size={20} color="#94A3B8" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor="#94A3B8"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 24,
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center', // centraliza horizontalmente
    width: '90%',
    alignSelf: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  title: {
    color: '#E2E8F0',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center', // centraliza o texto
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    width: '100%',  // mesma largura do container (90% da tela)
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',  // mesma largura que inputs
    marginTop: 0,
  },
  button: {
    height: 52, // mesma altura do inputContainer
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    width: '100%', // preenche toda largura do wrapper
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
