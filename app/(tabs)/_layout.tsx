// ESTRUTURA DA PAGINA
import React, { useEffect } from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, Dimensions } from 'react-native';

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
const TAB_COUNT = 5; // QUANTIDADE DE "ABAS"

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
        <View style={{ flexDirection: 'row', height: 80, backgroundColor: '#fff', position: 'relative' }}>
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
                  backgroundColor: '#4A90E2',
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
                  <Text style={{ color: isFocused ? '#4A90E2' : 'black' }}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}>
        
      <Tabs.Screen
        name="index"
        options={{
           title: ' Petto ',
           tabBarIcon: () => <FontAwesome name="home" size={ 30 } color="black" />,
           headerRight: () => (
             <Link href="/modal" asChild>
               <Pressable>
                 {({ pressed }) => (
                   <FontAwesome
                     name="info-circle"
                     size={ 40 }
                     color={Colors[colorScheme ?? 'light'].text}
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
          tabBarIcon: () => <MaterialCommunityIcons name="needle" size={ 30 } color="purple" />,
        }}
      />

      <Tabs.Screen
        name="contato"
        options={{
          title: ' Contato ',
          tabBarIcon: () => <Foundation name="telephone" size={ 30 } color="black" />,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: ' Login ',
          tabBarIcon: () => <Entypo name="login" size={ 30 } color="green" />,
          headerStyle: {
            backgroundColor: '#8B4513',  
          },
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold',
            color: 'white',
          },
          headerTintColor: 'white', 
        }}
      />

      <Tabs.Screen
        name="config"
        options={{
          title: ' Configuração ',
          tabBarIcon: () => <Feather name="settings" size={ 30 } color="black" />,
          headerRight: () => (
            <Link href="/conta" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5 
                    name="user-circle" 
                    size={ 40 } 
                    color={Colors[colorScheme ?? 'light'].text}
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
