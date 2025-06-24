import { Pressable, View, Text, Dimensions, Image } from 'react-native';
import React, { useEffect } from 'react';
import { Tabs, Link } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

// Ícones (sem alterações aqui)
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');
const TAB_COUNT = 4;

function CustomHeaderTitle({ title }: { title: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image 
        source={require('@/assets/imagess/logo/iconBrancaSemFundoSemNome.png')} 
        style={{ width: 45, height: 45 }} 
        resizeMode="contain" 
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Petto</Text>
        <Text style={{ fontSize: 12, color: "#d3d3d3" }}>{title}</Text>
      </View>
    </View>
  );
}


export default function TabLayout() {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabWidth = width / TAB_COUNT;
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(activeTab * tabWidth, { duration: 300 });
  }, [activeTab]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  
  const primaryColor = '#274472';
  const activeColor = '#5899E2';
  const inactiveColor = '#c5d9ed';

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: primaryColor, height: 100 },
        headerTintColor: 'white',
      }}
      tabBar={(props) => (
        <View style={{ flexDirection: 'row', height: 80, backgroundColor: primaryColor }}>
          <Animated.View
            style={[
              { position: 'absolute', top: 10, width: tabWidth, alignItems: 'center', justifyContent: 'center' },
              indicatorStyle,
            ]}
          >
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: activeColor, opacity: 0.8 }}/>
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

            const IconComponent = options.tabBarIcon;
            const color = isFocused ? 'white' : inactiveColor;

            return (
              <Pressable
                key={index}
                onPress={onPress}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
              >
                {IconComponent && <IconComponent focused={isFocused} color={color} size={30} />}

                <Text style={{ color, fontSize: 12, marginTop: 4 }}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    >
      {/* As telas (Tabs.Screen) continuam as mesmas do código anterior */}
      <Tabs.Screen name="index" options={{ title: 'Início', headerTitle: () => <CustomHeaderTitle title="Página Inicial " />, tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />, headerRight: () => (<Link href="/funLogin/modal" asChild><Pressable>{({ pressed }) => (<FontAwesome name="info-circle" size={30} color={"white"} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>)}</Pressable></Link>), }} />
      <Tabs.Screen name="vacinacao" options={{ title: 'Vacinação', headerTitle: () => <CustomHeaderTitle title="Carteira de Vacinação " />, tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="needle" size={size} color={color} />, }} />
      <Tabs.Screen name="contato" options={{ title: 'Contato', headerTitle: () => <CustomHeaderTitle title="Fale Conosco " />, tabBarIcon: ({ color, size }) => <Foundation name="telephone" size={size} color={color} />, }} />
      <Tabs.Screen name="config" options={{ title: 'Config.', headerTitle: () => <CustomHeaderTitle title="Configurações " />, tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />, headerRight: () => (<Link href="/funLogin/conta" asChild><Pressable>{({ pressed }) => (<FontAwesome5 name="user-circle" size={30} color={"white"} style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}/>)}</Pressable></Link>), }} />
    </Tabs>
  );
}