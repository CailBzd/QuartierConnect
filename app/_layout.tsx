import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator  } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack  } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "react-native-paper";

export default function RootLayout() {
  const theme = useTheme();  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // Pour afficher un indicateur de chargement pendant la vérification

  // Vérification de l'authentification au montage du layout
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token'); // Récupérer le token s'il existe
        setIsAuthenticated(!token); // Si le token existe, l'utilisateur est authentifié
      } catch (error) {
        console.error('Erreur lors de la vérification du token', error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    checkAuth();
  }, []);

  // Affichage d'un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
            {/* Afficher un en-tête différent selon l'authentification */}
            <Header userType={isAuthenticated ? "authenticated" : "guest"} />
            
            <View style={styles.content}>
              <Stack screenOptions={{ headerShown: false }}>
              </Stack>
          </View>
          <Footer />
        </View>
      </PaperProvider>
    </I18nextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
