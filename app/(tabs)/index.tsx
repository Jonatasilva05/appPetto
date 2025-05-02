import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import LottieView from 'lottie-react-native';

export default function TabFourScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/img/json/bemvindo.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
});
