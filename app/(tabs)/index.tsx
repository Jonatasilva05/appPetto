import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabFourScreen() {
  return (
    <View style={ styles.container }>
      <Text style={ styles.titleH1 }> BEM-VINDO Á PETTO </Text>
      <Text> A Petto oferece uma gama de serviços que garantem o bem-estar do seu animal de estimação, desde passeios com cães até vacinação e consultoria de saúde. Nosso objetivo é cuidar do seu pet com amor e dedicação. </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleH1: {
    fontSize: 30,
    fontWeight: "600",
  },
});