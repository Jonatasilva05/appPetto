import { StyleSheet, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import { View } from '@/components/Themed';
import React, { useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Ionicons } from '@expo/vector-icons';  // Biblioteca de ícones (se não estiver usando, instale com: expo install @expo/vector-icons)


export default function TabThreeScreen() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={ styles.container }>
      <Image style={ styles.imageLogin } source={require('@/assets/images/login/iconeLogin.png')} />
      <Text style={ styles.titleLogin }> Login </Text>
      <Text style={ styles.textEmail }> Email </Text>
      <TextInput style={ styles.colorInput } placeholder='Digite seu Email...' placeholderTextColor="#8B4513" />

      <Text style={ styles.textSenha }> Senha </Text>
        <TextInput style={styles.textInput} placeholder="Digite sua Senha..." placeholderTextColor="#b3b3b3" secureTextEntry={!showPassword} />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'} 
                size={24}
                color="black"
              />
            </TouchableOpacity>

      <Text style={ styles.cadastroText }> Não tenho cadastro?  </Text>

      <TouchableOpacity style={ styles.customButton }>
        <Text style={ styles.buttonText }> Entrar </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -150,
    backgroundColor: '#CD853F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogin: {
    height: 250,
    width: 250,
  },
  titleLogin: {
    fontWeight: '800',
    color: '#7B68EE',
    fontSize: 45,
  },
  textEmail: {
    alignSelf: 'flex-start',
    fontWeight: '300',
    marginLeft: 45,
    fontSize: 30,
    width: '80%',
  },
  textSenha: {
    alignSelf: 'flex-start',
    fontWeight: '300',
    marginLeft: 45,
    paddingTop: 25,
    fontSize: 30,
    width: '80%',
  },
  colorInput: {
    backgroundColor: '#DEB887',
    borderRadius: 15,
    marginBottom: 15,
    marginTop: 15,
    fontSize: 20,
    width: '80%',
    padding: 10,
    height: 60,
  },
  customButton: {
    backgroundColor: '#8B0000',
    paddingHorizontal: 165,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 25,
  },
  cadastroText: {
    fontSize: 18,
    color: '#193ffd',
    margin: 0,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF8DC',
    fontSize: 20,
  },
  textInput: {
    backgroundColor: 'white',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderColor: 'black',
    width: '60%',
    borderWidth: 2,
  },
  iconContainer: {
    position: 'absolute', 
    right: 10, 
  },
});





// const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword); // Alterna a visibilidade da senha
//   };
//             <TextInput
//               style={style.textInput} placeholder="Digite sua Senha..." placeholderTextColor="#b3b3b3" secureTextEntry={!showPassword} />
//             <TouchableOpacity onPress={togglePasswordVisibility} style={style.iconContainer}>
//               <Ionicons
//                 name={showPassword ? 'eye-off' : 'eye'} 
//                 size={24}
//                 color="black"
//               />
//             </TouchableOpacity>





// ANIMAÇAÕ DO INPUT TEXT
// import React, { useRef, useState } from 'react';
// import { StyleSheet, Image, TextInput, TouchableOpacity, Text, Animated, View } from 'react-native';

// export default function TabThreeScreen() {
//   const emailAnim = useRef(new Animated.Value(0)).current;
//   const senhaAnim = useRef(new Animated.Value(0)).current;

//   const handleFocus = (anim) => {
//     Animated.spring(anim, {
//       toValue: -10,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleBlur = (anim) => {
//     Animated.spring(anim, {
//       toValue: 0,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       <Image style={styles.imageLogin} source={require('@/assets/images/login/iconeLogin.png')} />
//       <Text style={styles.titleLogin}> Login </Text>

//       <Text style={styles.textEmail}> Email </Text>
//       <Animated.View style={{ transform: [{ translateY: emailAnim }] }}>
//         <TextInput
//           style={styles.colorInput}
//           placeholder="Digite seu Email..."
//           placeholderTextColor="#8B4513"
//           onFocus={() => handleFocus(emailAnim)}
//           onBlur={() => handleBlur(emailAnim)}
//         />
//       </Animated.View>

//       <Text style={styles.textSenha}> Senha </Text>
//       <Animated.View style={{ transform: [{ translateY: senhaAnim }] }}>
//         <TextInput
//           style={styles.colorInput}
//           placeholder="Digite sua Senha..."
//           placeholderTextColor="#8B4513"
//           secureTextEntry
//           onFocus={() => handleFocus(senhaAnim)}
//           onBlur={() => handleBlur(senhaAnim)}
//         />
//       </Animated.View>

//       <TouchableOpacity style={styles.customButton}>
//         <Text style={styles.buttonText}>Entrar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#CD853F',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   titleLogin: {
//     color: '#7B68EE',
//     fontWeight: '800',
//     fontSize: 40,
//   },
//   imageLogin: {
//     height: 180,
//     width: 180,
//   },
//   textEmail: {
//     alignSelf: 'flex-start',
//     marginLeft: 45,
//     fontWeight: '300',
//     fontSize: 25,
//   },
//   textSenha: {
//     alignSelf: 'flex-start',
//     marginLeft: 45,
//     fontWeight: '300',
//     fontSize: 25,
//     paddingTop: 25,
//   },
//   colorInput: {
//     backgroundColor: '#DEB887',
//     borderRadius: 15,
//     width: 260,
//     padding: 10,
//     marginBottom: 15,
//   },
//   customButton: {
//     backgroundColor: '#8B0000',
//     paddingVertical: 12,
//     paddingHorizontal: 50,
//     borderRadius: 15,
//     marginTop: 25,
//   },
//   buttonText: {
//     color: '#FFF8DC',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
