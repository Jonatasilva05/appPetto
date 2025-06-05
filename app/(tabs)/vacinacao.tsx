import { StyleSheet, Image, Animated } from 'react-native';
import { Text, View } from '@/components/Themed';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import EditScreenInfo from '@/components/EditScreenInfo';
import Foundation from '@expo/vector-icons/Foundation';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import LottieView from 'lottie-react-native';


export default function TabThreeScreen() {
  return (
    <View style={ styles.container }>

      {/* "CABECARIO" */}
      <View style={ styles.header }>
        <View style={styles.backgroundHeader }>
          <View style={styles.topHeader }> 
            <Image style={styles.imgHeader } source={require('@/assets/images/logo/iconBrancaSemFundoMenor.png')} />
          </View>
          <View style={ styles.bottomHeader }>
            <Text style={ styles.textHeader }>Carteira de Vacinação Digital </Text>
          </View>
        </View>
      </View>

      <View style={ styles.body }>
        <View style={ styles.animacaoJson }> 
          <LottieView 
          source={require('@/assets/images/json/dog.json')} 
          autoPlay 
          loop 
          style={ styles.animation } 
          />
          <Text style={ styles.nomePet }> Chocolate </Text>
        </View>

        <View style={styles.dadosPet}>
          {/** 1 Coluna - Espécie */}
          <View style={styles.row}>
            <View style={styles.col1}>
              <Image style={styles.imgBodyGene} source={require("@/assets/images/images/cachorro.png")} />
              <Text style={styles.textLabelBody}> Espécie: </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textLabelBody2}> Cachorro </Text>
            </View>
          </View>

          {/** 2 Coluna - Raça */}
          <View style={styles.row}>
            <View style={styles.col1}>
              <Ionicons name="paw" size={30} color="black" />
              <Text style={styles.textLabelBody}> Raça: </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textLabelBody2}> Golden </Text>
            </View>
          </View>

          {/** 3 Coluna - Idade */}
          <View style={styles.row}>
            <View style={styles.col1}>
              <FontAwesome name="heart" size={30} color="black" />
              <Text style={styles.textLabelBody}> Idade: </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textLabelBody2}> 1 Ano </Text>
            </View>
          </View>

          {/** 4 Coluna - Alergia */}
          <View style={styles.row}>
            <View style={styles.col1}>
              <FontAwesome5 name="virus" size={30} color="black" />
              <Text style={styles.textLabelBody}> Alergia: </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textLabelBody2}> N/D </Text>
            </View>
          </View>

          {/** 5 Coluna - Última Consulta */}
          <View style={styles.row}>
            <View style={styles.col1}>
              <Entypo name="calendar" size={30} color="black" />
              <Text style={styles.textLabelBody}> Última Consulta: </Text>
            </View>
            <View style={styles.col2}>
              <Text style={styles.textLabelBody2}> N/D </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#193ffd',
  },
  
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    flex: 1 / 4,
  },

  backgroundHeader: {
    ...StyleSheet.absoluteFillObject,
  },

  topHeader: {
    justifyContent: 'center',
    backgroundColor: '#ff6498',
    alignItems: 'center',
    flex: 1,
  },

  bottomHeader: {
    backgroundColor: '#ffc320',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  imgHeader: {
    tintColor: 'white', // PARA DEIXAR A LOGO BRANCA MAS SÓ FUNCIONA BEM COM IMGs EM FORMATO PNG
    height: 100,
    width: 100,
  },

  textHeader: {
    textAlign: 'left',
    letterSpacing: 3,
    color: 'black',
    fontSize: 35,
    width: 380,
  },

  body: {
    backgroundColor: '#193ffd',
    flex: 1/2,
  },

  animacaoJson: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#193ffd',
  },

  animation: {
    backgroundColor: 'red',
    height: 200,
    width: 200,
  },

  nomePet: {
    fontSize: 35,
  },

  dadosPet: {
    justifyContent: 'center',
    backgroundColor: '#193ffd',
    height: 400,
  },

  imgBodyGene: {
    height: 35,
    width: 35,
  },

  row: {
    backgroundColor: '#20a9ff',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    paddingVertical: 8,
    // marginBottom: 5, PREFERIVEL
    marginRight: 10,
    marginLeft: 8,
  },

  col1: {
    backgroundColor: 'transparent',
    borderRightWidth: 1,
    flexDirection: 'row',
    borderColor: '#ccc',
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