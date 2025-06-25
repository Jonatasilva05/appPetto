import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// ===================================================================================
//  ✅ PASSO IMPORTANTE:
//  1. Inicie a API com `node api.js`.
//  2. O terminal da API vai mostrar o endereço IP correto (ex: http://192.168.1.5:3000).
//  3. Copie ESSE endereço e cole na variável API_BASE_URL abaixo.
// ===================================================================================
const API_BASE_URL = 'http://192.168.1.17:3000'; // Ex: 'http://192.168.1.5:3000'

// Não altere as linhas abaixo
const API_URL = `${API_BASE_URL}/api`; 
const TOKEN_KEY = 'auth-token-petto';

// --- Interfaces e Contexto ---
interface AuthContextType {
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

// --- Lógica do Provider ---
function useProtectedRoute(session: string | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(tabs)';

    // Se não há sessão e o usuário tenta aceder a uma rota protegida
    if (!session && inAuthGroup) {
      router.replace('/login');
    } 
    // **CORREÇÃO APLICADA AQUI**
    // Se há sessão e o usuário tenta aceder a uma rota de autenticação (como /login)
    else if (session && !inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [session, segments, router]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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

// Exporta a URL completa da API
export { API_URL };
