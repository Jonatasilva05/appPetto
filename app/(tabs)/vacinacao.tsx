import { StyleSheet, Image, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EditScreenInfo from '@/components/EditScreenInfo';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import LottieView from 'lottie-react-native';


export default function TabThreeScreen() {
  return (
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* "CABECARIO" */}
          <View style={ styles.header }>
            <View style={styles.backgroundHeader }>
              <View style={ styles.bottomHeader }>
                <Text style={ styles.textHeader }>Carteira de Vacinação Digital </Text>
              </View>
            </View>
          </View>

          <View style={ styles.body }>
            <View style={ styles.imageBody }> 
              <Image style={ styles.animation } source={require("@/assets/images/images/cachorro.png")} />
              <Text style={ styles.nomePet }> Chocolate </Text>
            </View>

            <View style={styles.dadosPet}>
              {/** 1 Coluna - Espécie */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Image style={styles.imgBodyGene} source={require("@/assets/images/icon/genetica.png")} />
                  <Text style={styles.textLabelBody}> Espécie: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2} onPress={() => router.push('/(tabs)/login')}> Cachorro </Text>
                </View>
              </View>

              {/** 2 Coluna - Raça */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Ionicons name="paw" size={30} color="black" />
                  <Text style={styles.textLabelBody}> Raça: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2} onPress={() => router.push('/(tabs)/login')}> Golden </Text>
                </View>
              </View>
              
              {/** 3 Coluna - Idade */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <FontAwesome name="heart" size={30} color="black" />
                  <Text style={styles.textLabelBody}> Idade: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2} onPress={() => router.push('/(tabs)/login')}> 1 Ano </Text>
                </View>
              </View>

              {/** 4 Coluna - Alergia */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <FontAwesome5 name="virus" size={30} color="black" />
                  <Text style={styles.textLabelBody}> Alergia: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2} onPress={() => router.push('/(tabs)/login')}> N/D </Text>
                </View>
              </View>

              {/** 5 Coluna - Última Consulta */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Entypo name="calendar" size={30} color="black" />
                  <Text style={styles.textLabelBody}> Última Consulta: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2} onPress={() => router.push('/(tabs)/login')}> N/D </Text>
                </View>
              </View>

              {/** 6 Coluna - Telefone */}
              <View style={styles.row}>
                <View style={styles.col1}>
                  <Foundation name="telephone" size={30} color="black" />
                  <Text style={styles.textLabelBody}> Telefone para Contato: </Text>
                </View>
                <View style={styles.col2}>
                  <Text style={styles.textLabelBody2}> (16) 99999-9999 </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    
  },

  keyboardAvoiding: {
    flex: 1,
  },

  container: {
    backgroundColor: '#193ffd',
    flex: 1,
  },
  
  header: {
    backgroundColor: '#e31b00', // COR AMARELA DE ANTES -> backgroundColor: '#ffc320',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },

  bottomHeader: {
    backgroundColor: '#e31b00',
  },

  imgHeader: {
    tintColor: 'white', // PARA DEIXAR A LOGO BRANCA MAS SÓ FUNCIONA BEM COM IMGs EM FORMATO PNG
    height: 100,
    width: 100,
  },

  textHeader: {
    textAlign: 'left',
    letterSpacing: 3,
    color: 'white',
    fontSize: 35,
    width: 380,
  },

  body: {
    flex: 1/2,
  },

  imageBody: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },

  backgroundHeader: {
    backgroundColor: 'white',
  },

  animation: {
    height: 200,
    width: 200,
  },

  nomePet: {
    fontSize: 35,
  },

  dadosPet: {
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 400,
  },

  imgBodyGene: {
    height: 35,
    width: 35,
  },

  row: {
    backgroundColor: '#eaeaea',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    paddingVertical: 13,
    // marginBottom: 5, PREFERIVEL
    marginRight: 10,
    marginLeft: 8,
  },

  col1: {
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    flexDirection: 'row',
    borderColor: 'black',
    alignItems: 'center',
    paddingRight: 8,
    marginLeft: 10,
    width: '45%',
  },

  col2: {
    backgroundColor: 'transparent',
    paddingLeft: 10,
    width: '50%',
  },

  textLabelBody: {
    position: 'relative',
    fontSize: 20,
    left: 10,
  },
  textLabelBody2: {
    position: 'relative',
    fontSize: 20,
  },
});