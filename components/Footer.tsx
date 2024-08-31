import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{t('copyright')}</Text>
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
