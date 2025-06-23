import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image } from 'react-native';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

const GrayTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3b4042',
    background: '#3b4042',
    card: '#3b4042',
    text: '#3b4042',
    border: '#3b4042',
    notification: '#3b4042',
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={GrayTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false, headerTintColor: 'white', }}/>

        {/* <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, headerTintColor: 'white',
            // COM O HEADER TITLE O NOME NAO APARECE RESOLVER ISSO
            headerTitle: () => (
              <Image
                source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')}
                style={{ width: 83, height: 80, resizeMode: 'contain' }}
              />
            ),
          }}
        /> */}
        
        {/* <Stack.Screen name="cadastro" options={{ headerShown: true, headerTintColor: 'white', }} /> SE CASO DESEJAR A SETA PARA "VOLTAR" */} 

        {/* <Stack.Screen name="conta" options={{ presentation: 'modal', headerStyle: { backgroundColor: '#4A90E2', }, headerTitleStyle: { fontSize: 22, fontWeight: 'bold', color: 'white', }, headerTintColor: 'white', }} /> */}
      </Stack>
    </ThemeProvider>
  );
}










// CASO DESEJAR VOLTAR NO MODO DARK E LIGHT
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//         <Stack.Screen
//           name="conta"
//           options={{
//             presentation: 'modal',
//             headerStyle: {
//               backgroundColor: '#4A90E2',
              
//             },
//             headerTitleStyle: {
//               fontSize: 22,
//               fontWeight: 'bold',
//               color: 'white',
//             },
//             headerTintColor: 'white', 
//           }}
//         />
//       </Stack>
//     </ThemeProvider>
//   );
// }