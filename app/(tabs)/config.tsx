import { StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';

// 1. Importar o hook de autenticação do nosso contexto central
// O caminho pode precisar de ajuste dependendo de onde salvou o arquivo de config.
// Ex: '../context/AuthContext' ou '@/app/context/AuthContext'
import { useAuth } from '../context/AuthContext'; 

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 2. Obter a função signOut do contexto. É a única coisa que precisamos.
  const { signOut } = useAuth();

  const handleLogout = () => {
    // 3. Implementação da lógica CORRETA para deslogar
    //    Usamos um Alerta para dar ao usuário uma chance de cancelar.
    Alert.alert(
      "Sair da Conta",
      "Você tem certeza que deseja sair?",
      [
        // Opção de cancelar
        {
          text: "Cancelar",
          style: "cancel",
        },
        // Opção de confirmar a saída
        {
          text: "Sair",
          style: "destructive",
          // Ao pressionar, chamamos a função signOut.
          // Ela apaga o token de login e o nosso AuthContext cuidará
          // do redirecionamento automático e seguro para a tela '/login'.
          onPress: () => signOut(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Escuro</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notificações</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Cor suave para a linha
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#ff4d4d',
    borderRadius: 10,
    alignItems: 'center',
    // Adicionando uma pequena sombra para destaque
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});