import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';


const backgroundImage = require("@/assets/images/images/cenario-cachorro.jpg") 

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const router = useRouter();

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <Text style={styles.title}> Bem vindo ao Petto </Text>
              <Text style={styles.welcome}>Aqui você encontra a melhor segurança do seu Pet! </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.loginTitle}> Entrar na conta ! </Text>

              <Text style={styles.inputLabel}> Nome </Text>
              <TextInput style={styles.input} placeholder="Digite seu nome completo..." placeholderTextColor="#ccc" value={nome} onChangeText={setNome}/>

              <Text style={styles.inputLabel}> Email </Text>
              <TextInput style={styles.input} placeholder="email@exemplo.com" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

              <Text style={styles.inputLabel}> Senha </Text>
              <View style={styles.passwordContainer}>
                <TextInput style={styles.inputPassword} placeholder="Digite sua senha..." placeholderTextColor="#ccc" value={password} onChangeText={setPassword} secureTextEntry={!mostrarSenha}/>
                <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.icon}>
                  <Ionicons name={mostrarSenha ? 'eye-off' : 'eye'} size={24} color="#fff" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Entrar </Text>
              </TouchableOpacity>

              <View style={styles.signUpTextContainer}>
                <Text style={styles.signUpText}>
                  Não tem conta?
                  <Text style={styles.linkText} onPress={() => router.push('/cadastro')}> Cadastre-se </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontWeight: '700',
    color: 'dodgerblue',
    fontSize: 45,
  },
  welcome: {
    fontWeight: '300',
    letterSpacing: 2,
    textAlign: 'justify',
    color: '#fff',
    fontSize: 30,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    flex: 1,
  },
  loginTitle: {
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#fff',
    marginTop: 0,
    fontSize: 24,
  },
  inputLabel: {
    marginBottom: 10,
    color: '#fff',
    fontSize: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    color: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: '#ccc',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputPassword: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
  },
  icon: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1565C0',
    alignItems: 'center',
    paddingVertical: 14,
    marginVertical: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 18,
  },
  pickerContainer: {
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderColor: '#ccc',
  marginBottom: 15,
  borderRadius: 10,
  borderWidth: 1,
  },
  picker: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    height: 50,
  },
  signUpTextContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  signUpText: {
    color: '#fff',
    fontSize: 20,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'dodgerblue',
    fontSize: 20,
  },
});















// LOGIN ANTIGO
// import { StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
// import { View } from '@/components/Themed';
// import React, { useState } from 'react';

// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Ionicons } from '@expo/vector-icons';  // Biblioteca de ícones (se não estiver usando, instale com: expo install @expo/vector-icons)
// import { useRouter } from 'expo-router';

// export default function TabThreeScreen() {

//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <View style={ styles.container }>
//       <Image style={ styles.imageLogin } source={require('@/assets/images/login/iconLogin.png')} />
//       <Text style={ styles.titleLogin }> Login </Text>
//       <Text style={ styles.textEmail }> Email </Text>
//       <TextInput style={ styles.colorInput } placeholder='Digite seu Email...' placeholderTextColor="#8B4513" />

//       <Text style={ styles.textSenha }> Senha </Text>
//       <TextInput style={ styles.colorInput } placeholder="Digite sua Senha..." placeholderTextColor="#8B4513" secureTextEntry={!showPassword} />

//       <TouchableOpacity onPress={togglePasswordVisibility} style={ styles.iconOlho } >
//         <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={ 35 } color="black" />
//       </TouchableOpacity>

// {/* 🐵🙈 */}

//       <Text style={ styles.cadastroText } onPress={() => router.push('/cadastro')}> Não tenho cadastro?  </Text>

//       <TouchableOpacity style={ styles.customButton }>
//         <Text style={ styles.buttonText }> Entrar </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: -150,
//     backgroundColor: '#CD853F',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageLogin: {
//     height: 250,
//     width: 250,
//   },
//   titleLogin: {
//     fontWeight: '800',
//     color: '#7B68EE',
//     fontSize: 45,
//   },
//   textEmail: {
//     alignSelf: 'flex-start',
//     fontWeight: '300',
//     marginLeft: 45,
//     fontSize: 30,
//     width: '80%',
//   },
//   textSenha: {
//     alignSelf: 'flex-start',
//     fontWeight: '300',
//     marginLeft: 45,
//     paddingTop: 25,
//     fontSize: 30,
//     width: '80%',
//   },
//   colorInput: {
//     backgroundColor: '#DEB887',
//     borderRadius: 15,
//     marginBottom: 15,
//     marginTop: 15,
//     fontSize: 20,
//     width: '80%',
//     padding: 10,
//     height: 60,
//   },
//   customButton: {
//     backgroundColor: '#8B0000',
//     paddingHorizontal: 165,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 25,
//   },
//   iconOlho: {
//     position: 'relative',
//     bottom: 63,
//     left: 155,
//   },
//   cadastroText: {
//     color: '#193ffd',
//     fontSize: 18,
//     padding: 15,
//     margin: 0,
//   },
//   buttonText: {
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#FFF8DC',
//     fontSize: 20,
//   },
// });





// // const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword); // Alterna a visibilidade da senha
// //   };
// //             <TextInput
// //               style={style.textInput} placeholder="Digite sua Senha..." placeholderTextColor="#b3b3b3" secureTextEntry={!showPassword} />
// //             <TouchableOpacity onPress={togglePasswordVisibility} style={style.iconContainer}>
// //               <Ionicons
// //                 name={showPassword ? 'eye-off' : 'eye'} 
// //                 size={24}
// //                 color="black"
// //               />
// //             </TouchableOpacity>





// // ANIMAÇAÕ DO INPUT TEXT
// // import React, { useRef, useState } from 'react';
// // import { StyleSheet, Image, TextInput, TouchableOpacity, Text, Animated, View } from 'react-native';

// // export default function TabThreeScreen() {
// //   const emailAnim = useRef(new Animated.Value(0)).current;
// //   const senhaAnim = useRef(new Animated.Value(0)).current;

// //   const handleFocus = (anim) => {
// //     Animated.spring(anim, {
// //       toValue: -10,
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const handleBlur = (anim) => {
// //     Animated.spring(anim, {
// //       toValue: 0,
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Image style={styles.imageLogin} source={require('@/assets/images/login/iconeLogin.png')} />
// //       <Text style={styles.titleLogin}> Login </Text>

// //       <Text style={styles.textEmail}> Email </Text>
// //       <Animated.View style={{ transform: [{ translateY: emailAnim }] }}>
// //         <TextInput
// //           style={styles.colorInput}
// //           placeholder="Digite seu Email..."
// //           placeholderTextColor="#8B4513"
// //           onFocus={() => handleFocus(emailAnim)}
// //           onBlur={() => handleBlur(emailAnim)}
// //         />
// //       </Animated.View>

// //       <Text style={styles.textSenha}> Senha </Text>
// //       <Animated.View style={{ transform: [{ translateY: senhaAnim }] }}>
// //         <TextInput
// //           style={styles.colorInput}
// //           placeholder="Digite sua Senha..."
// //           placeholderTextColor="#8B4513"
// //           secureTextEntry
// //           onFocus={() => handleFocus(senhaAnim)}
// //           onBlur={() => handleBlur(senhaAnim)}
// //         />
// //       </Animated.View>

// //       <TouchableOpacity style={styles.customButton}>
// //         <Text style={styles.buttonText}>Entrar</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#CD853F',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   titleLogin: {
// //     color: '#7B68EE',
// //     fontWeight: '800',
// //     fontSize: 40,
// //   },
// //   imageLogin: {
// //     height: 180,
// //     width: 180,
// //   },
// //   textEmail: {
// //     alignSelf: 'flex-start',
// //     marginLeft: 45,
// //     fontWeight: '300',
// //     fontSize: 25,
// //   },
// //   textSenha: {
// //     alignSelf: 'flex-start',
// //     marginLeft: 45,
// //     fontWeight: '300',
// //     fontSize: 25,
// //     paddingTop: 25,
// //   },
// //   colorInput: {
// //     backgroundColor: '#DEB887',
// //     borderRadius: 15,
// //     width: 260,
// //     padding: 10,
// //     marginBottom: 15,
// //   },
// //   customButton: {
// //     backgroundColor: '#8B0000',
// //     paddingVertical: 12,
// //     paddingHorizontal: 50,
// //     borderRadius: 15,
// //     marginTop: 25,
// //   },
// //   buttonText: {
// //     color: '#FFF8DC',
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// // });
