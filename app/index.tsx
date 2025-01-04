import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Attendre un court délai (1 seconde ici) pour simuler le chargement
      await new Promise(resolve => setTimeout(resolve, 1000));

      try {
        const token = await AsyncStorage.getItem('bearerToken');
        if (token) {
          // Si le token est trouvé, rediriger vers la page "account"
          router.replace('/account');
        } else {
          // Sinon, rediriger vers la page "welcome"
          router.replace('/welcome');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token', error);
        // En cas d'erreur, rediriger vers la page "welcome"
        router.replace('/welcome');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Affichage d'un écran de chargement (SplashScreen) pendant la vérification
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Retourne null une fois que la redirection est effectuée
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
