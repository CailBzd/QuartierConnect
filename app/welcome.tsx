import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.title}>{t('welcome')}</Title>
        <Paragraph style={styles.tagline}>
          {t('tagline')}
        </Paragraph>
        <Button mode="contained" onPress={() => alert('Get Started')} style={styles.button}>
          {t('get_started')}
        </Button>
      </Card.Content>
    </Card>            
  </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#ffffff",
    },
    card: {
      width: '100%',
      maxWidth: 500,
      elevation: 4,
      borderRadius: 8,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: 10,
    },
    tagline: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 20,
    },
    button: {
      marginTop: 20,
    },
  });
  
