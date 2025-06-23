import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { View, Text } from '@/components/Themed';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';

export default function ModalScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [username, setUsername] = useState(' Usuário ');
  const [tempUsername, setTempUsername] = useState(username);
  const [changingImage, setChangingImage] = useState(false);

  // FUNÇÃO QUE ABRE AS FOTOS PARA O USUARIO SELECIONAR
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    alert("Imagem atualizada com sucesso!")

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setChangingImage(false);
    }
  };

  // FUNÇÃO QUE REMOVE A IMAGEM
  const removeImage = () => {
    setImageUri(null);
    setChangingImage(false);
    alert("Imagem removida com sucesso!")
  };

  // FUNÇÃO PARA SALVAR O NOME EDITADO DO USUARIO
  const saveName = () => {
    setUsername(tempUsername);
    setEditingName(false);
    alert("Nome do usuário alterado com sucesso!")
  };

  return (
    <View style={styles.container}>

      {/* IMAGEM DO USUÁRIO */}
      <TouchableOpacity onPress={() => setChangingImage(true)}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.profileImage} />
        ) : (
          <FontAwesome5 name="user-circle" size={120} color="gray" />
        )}
      </TouchableOpacity>

      {/* BOTÕES PARA ALTERAR IMAGEM */}
      {changingImage && (
        <View style={styles.imageOptions}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Trocar Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={removeImage}>
            <Text style={styles.imageButtonText}>Excluir Imagem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => setChangingImage(false)}>
            <Text style={styles.imageButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* INFORMAÇÕES DO USUÁRIO */}
      <View style={styles.userInfo}>
        {editingName ? (
          <View style={styles.editRow}>
            <TextInput style={styles.input} value={tempUsername} onChangeText={setTempUsername} autoFocus/>
            <TouchableOpacity onPress={saveName}>
              <Feather name="check" size={24} color="green" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditingName(false)}>
              <Feather name="x" size={24} color="red" style={styles.icon} />
            </TouchableOpacity>
          </View>
          
        ) : (

          // NOME DO USUARIO
          <View style={styles.editRow}>
            <Text style={styles.labelNome}>Nome: </Text>
            <Text style={styles.username}>{username}</Text>
            <TouchableOpacity onPress={() => setEditingName(true)}>
              <MaterialIcons name="edit" size={ 24 } color="black" style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* STATUS BAR */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  imageOptions: {
    marginTop: 10,
    gap: 10,
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    width: 180,
    alignItems: 'center',
  },
  imageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  labelNome: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 20,
  },
  input: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    minWidth: 150,
  },
  icon: {
    marginLeft: 5,
  },
});





// ORIGINAL
// import { StatusBar } from 'expo-status-bar';
// import { Platform, StyleSheet } from 'react-native';

// //ESTRUTURA PAGINA
// import EditScreenInfo from '@/components/EditScreenInfo';
// import { Text, View } from '@/components/Themed';

// export default function ModalScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>teste</Text>

//       {/* AQUI TRAZ INFORMAÇÕES DA PAGINA */}
//       {/* <EditScreenInfo path="app/modalConfig.tsx" /> */}

//       <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
// });