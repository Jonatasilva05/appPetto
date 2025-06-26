import { ThemeProvider, DefaultTheme, Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { AuthProvider, useAuth } from './context/AuthContext';


SplashScreen.preventAutoHideAsync();

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#274472', 
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}

function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    ...FontAwesome.font,
  });

  const { isLoading: isAuthLoading } = useAuth();

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded && !isAuthLoading) {
      SplashScreen.hideAsync();
      
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync("hidden");
      }
    }
  }, [fontsLoaded, isAuthLoading]);

  if (!fontsLoaded || isAuthLoading) {
    return null;
  }

  return (
    <ThemeProvider value={AppTheme}>
      <Stack>
        {/* Telas que não fazem parte das abas */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="funLogin/cadastro" options={{ headerShown: false }} />
        
        {/* CORREÇÃO APLICADA AQUI: Registrando a nova rota */}
        <Stack.Screen name="funLogin/cadastrarPet" options={{ headerShown: false }} />

        {/* Agrupamento de todas as telas com abas */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
      </Stack>
    </ThemeProvider>
  );
}
