import React from "react";
import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTheme } from "react-native-paper";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
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
});
