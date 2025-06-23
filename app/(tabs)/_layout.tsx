// ESTRUTURA DA PAGINA
import { Pressable, View, Text, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Link, Tabs } from 'expo-router';

// FONTES ICONES
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';

// ANIMAÇÕES, CORES...
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

// CALCULO DA LARGURA DAS ABAS
const { width } = Dimensions.get('window');
const TAB_COUNT = 4; // QUANTIDADE DE "ABAS"

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [activeTab, setActiveTab] = React.useState(0);
  const tabWidth = width / TAB_COUNT;
  const translateX = useSharedValue(0);

  // EFEITO PARA FAZER A "BOLINHA" SE MOVER ENTRE AS ABAS QUANDO ELAS MUDAREM
  useEffect(() => {
    translateX.value = withTiming(activeTab * tabWidth, { duration: 300 });
  }, [activeTab]);

  // INFORMA ONDE A "BOLINHA ESTÁ"
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            backgroundColor: '#ffff',
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 18,
            fontWeight: '600',
          },
          tabBarIconStyle: {
            marginBottom: 5,
          },
        headerShown: useClientOnlyValue(false, true),
      }}
      tabBar={(props) => (

        //BARRA DE NAVEGAÇÃO INFERIOR
        <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#3b4042', position: 'relative' }}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: 0,
                width: tabWidth,
                alignItems: 'center',
                justifyContent: 'center',
              },
              indicatorStyle,
            ]}>

            {/* BOLINHA EM BAIXO DOS ICONES QUE FAZ A ABA SE DESTACAR */}
            <View
              style={
                {
                  width: 50,
                  height: 50,
                  borderRadius: "100%",
                  backgroundColor: 'royalblue',
                  marginBottom: 5,
                }
              }/>
          </Animated.View>

          {props.state.routes.map((route, index) => {
            const { options } = props.descriptors[route.key];
            const label = options.title ?? route.name;
            const isFocused = props.state.index === index;

            const onPress = () => {
              if (!isFocused) {
                setActiveTab(index);
                props.navigation.navigate(route.name);
              }
            };

            const Icon = options.tabBarIcon;

            return (
              <Pressable
                key={index}
                onPress={onPress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  {Icon && Icon({ focused: isFocused, color: isFocused ? '#4A90E2' : 'gray', size: 30 })}
                  <Text style={{ color: isFocused ? '#4A90E2' : 'white' }}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: ' Index ',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')} style={{ width: 83, height: 90 }} resizeMode="contain" />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}> Petto </Text>
            </View>
          ),

          tabBarIcon: () => <FontAwesome name="home" size={30} color="silver" />,
          
          headerRight: () => (
            <Link href="/funLogin/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={40}
                    color={"white"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="vacinacao"
        options={{
          title: ' Vacinação ',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')} style={{ width: 83, height: 90 }} resizeMode="contain"/>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}> Vacinação </Text>
            </View>
          ),
          tabBarIcon: () => <MaterialCommunityIcons name="needle" size={ 30 } color="violet" />,
        }}
      />

      <Tabs.Screen
        name="contato"
        options={{
          title: ' Contato ',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')} style={{ width: 83, height: 90 }} resizeMode="contain"/>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}> Contato </Text>
            </View>
          ),
          tabBarIcon: () => <Foundation name="telephone" size={ 30 } color="silver" />,
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: ' Configuração ',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')} style={{ width: 83, height: 90 }} resizeMode="contain"/>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}> Configuração </Text>
            </View>
          ),
          tabBarIcon: () => <Feather name="settings" size={ 30 } color="silver" />,
          headerRight: () => (
            <Link href="/funLogin/conta" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5 
                    name="user-circle" 
                    size={ 40 } 
                    color={"white"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}/>

    </Tabs>
  );
}