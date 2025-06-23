// src/tabs/NotFound404.tsx
import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const NotFound404: React.FC = () => {
  return (
    <View style={styles.page}>
      <ImageBackground
        source={{ uri: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' }}
        style={styles.background}
        resizeMode="cover"
      >
        <Text style={styles.title}>404</Text>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Looks like you're lost</Text>
        <Text style={styles.paragraph}>The page you are looking for is not available!</Text>
        <TouchableOpacity onPress={() => Linking.openURL('/')}>
          <Text style={styles.link}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    alignItems: 'center',
    marginTop: -50,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    backgroundColor: '#39ac31',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default NotFound404;
