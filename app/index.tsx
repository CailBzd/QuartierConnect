import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const [, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {

      // Attendre 2 secondes avant de vérifier le token
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const token = await AsyncStorage.getItem('bearerToken');
        if (token) {
          // Si un token est trouvé, rediriger vers la page account
          router.replace('/account');
        } else {
          // Si aucun token n'est trouvé, rediriger vers la page welcome
          router.replace('/welcome');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token', error);
        router.replace('/welcome');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Affichage du splashscreen pendant la vérification
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // Le splashscreen disparaît après la redirection
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
