import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// IMPORTANTE: Substitua '<SEU_IP_LOCAL>' pelo IP da máquina onde a API está rodando.
// Para descobrir seu IP no Windows, use `ipconfig` no cmd. No Mac/Linux, use `ifconfig`.
// Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi.
const API_URL = 'http://192.168.1.17:3000/api'; 
const TOKEN_KEY = 'auth-token-petto';

interface AuthContextType {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hook para usar o contexto facilmente em outras partes do app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// Componente que protege as rotas
function useProtectedRoute(session: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    if (!session && inAuthGroup) {
      // Redireciona para a tela de login se o usuário não estiver logado
      // e estiver tentando acessar uma rota protegida.
      router.replace('/login');
    } else if (session && !inAuthGroup) {
      // Redireciona para a tela principal (tabs) se o usuário
      // estiver logado e acessar a tela de login.
      router.replace('/(tabs)');
    }
  }, [session, segments, router]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ao carregar o app, verifica se existe um token salvo
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setSession(token);
        }
      } catch (e) {
        console.error("Erro ao carregar token:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadToken();
  }, []);

  useProtectedRoute(session);

  const authValues: AuthContextType = {
    signIn: async (token: string) => {
      setSession(token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    },
    signOut: async () => {
      setSession(null);
      delete axios.defaults.headers.common['Authorization'];
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    },
    session,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}

// Exporta a URL da API para ser usada nas telas de login/cadastro
export { API_URL };
