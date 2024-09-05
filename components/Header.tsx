import React, { useEffect, useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Appbar, Menu, Button } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({userType}: {userType: string}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null); 
  const navigation = useNavigation();  // Utilisation de la navigation

  useEffect(() => {
    const fetchUserData = async () => {
      if (userType === "authenticated") {
        const storedName = await AsyncStorage.getItem('name');  // Récupérer le nom de l'utilisateur
        setUserName(storedName);
      }
    };
    fetchUserData();
  }, [userType]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="ViviLink" />
      {userType === "authenticated" ? (
        // Si l'utilisateur est connecté, afficher l'avatar
        <Appbar.Action 
        icon={() => (
          <Image
            source={require('../assets/avatar.png')}  // Image d'avatar (remplacez par le chemin de votre avatar)
            style={styles.avatar}
          />
        )}
        onPress={() => navigation.navigate('account')}  // Redirige vers la page de compte
        />
      ) : (
        <>
        {/* Bouton de connexion, redirige vers la page login */}
      <Appbar.Action 
        icon="login" 
        onPress={() => navigation.navigate('login')}  // Redirige vers la page de connexion
      />
      {/* Bouton d'inscription, redirige vers la page register */}
      <Appbar.Action 
        icon="account-plus" 
        onPress={() => navigation.navigate('register')}  // Redirige vers la page d'enregistrement
      />
      
      {/* Menu de langue */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={ <Appbar.Action
          icon={() => <FontAwesome name="globe" size={24} color="black" />}
          onPress={openMenu}
        />}>
        <Menu.Item 
          onPress={() => changeLanguage('en')} 
          title="English"
          icon={() => <FontAwesome name="flag" size={24} color="black" style={styles.icon} />} 
        />
        <Menu.Item 
          onPress={() => changeLanguage('fr')} 
          title="Français"
          icon={() => <FontAwesome name="flag" size={24} color="blue" style={styles.icon} />} 
        />
        {/* Ajoutez d'autres langues ici */}
      </Menu>
      </>
      )}
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#f8f9fa",
  },
  icon: {
    marginRight: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16, // Avatar circulaire
  },
});
