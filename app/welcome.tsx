import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity  } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import { images } from '../assets/images';
import { useRouter } from 'expo-router';
import SnakeGame from "../components/snakeGame";



export default function WelcomeScreen() {
  const { t } = useTranslation();
  const router = useRouter(); 
  const [showSnake, setShowSnake] = useState(false);
  const [tapCount, setTapCount] = useState(0);

    // Gérer les taps sur la bannière pour déclencher l'easter egg
    const handleBannerTap = () => {
      const newTapCount = tapCount + 1;
      setTapCount(newTapCount);
      if (newTapCount === 5) { // Affiche le jeu Snake après 5 taps
        setShowSnake(true);
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bannière principale */}
      <TouchableOpacity onPress={handleBannerTap} style={styles.bannerContainer}>
        <Image  
          source={images.banner} // Remplacez par votre image de bannière
          style={styles.bannerImage}
        />
        <Title style={styles.bannerTitle}>{t('welcome')}</Title>
      </TouchableOpacity >

   {/* Afficher le jeu Snake si activé */}
   {showSnake && <SnakeGame />}


      {/* Section principale */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{t('tagline')}</Title>
          <Paragraph style={styles.paragraph}>
            {t('description')}
          </Paragraph>
          <Button 
            mode="contained" 
            onPress={() => router.push('/login')} 
            style={styles.button}>
            {t('get_started')}
          </Button>
        </Card.Content>
      </Card>

      {/* Section d'information */}
      <View style={styles.infoContainer}>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Image 
              source={images.infoIcon}  // Remplacez par une icône
              style={styles.icon}
            />
            <Paragraph style={styles.infoText}>{t('info_text')}</Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.infoCard}>
          <Card.Content>
            <Image 
              source={images.supportIcon}  // Remplacez par une icône
              style={styles.icon}
            />
            <Paragraph style={styles.infoText}>{t('support_text')}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#f5f5f5",
  },
  bannerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  card: {
    width: '100%',
    maxWidth: 600,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 600,
  },
  infoCard: {
    flex: 1,
    marginHorizontal: 10,
    elevation: 3,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
});
