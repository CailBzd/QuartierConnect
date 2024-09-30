import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';
import Constants from 'expo-constants';

const Footer = () => {
  const { t } = useTranslation();
  const version = Constants.expoConfig?.version || '1.0.0'; // Utiliser une valeur par défaut
  const appName = Constants.expoConfig?.name || 'ViviLink';

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{t('copyright')} - {t('version')}: {version}</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    backgroundColor: "#f8f9fa",
  },
  footerText: {
    textAlign: "center",
    color: "#aaa",
  },
});
