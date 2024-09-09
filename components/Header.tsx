import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Appbar, Menu, Button, Portal, Dialog } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from '../contexts/AuthContext';  
import avatarImage from '../assets/images/avatar.png';

const Header = () => {
  const { t } = useTranslation();
  const { userType, setUserType } = useAuth(); 
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null); 
  const navigation = useNavigation();  // Utilisation de la navigation

  useEffect(() => {
    const fetchUserData = async () => {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserType('authenticated');  // Définir l'utilisateur comme authentifié
      } else {
        setUserType('guest');
      }
    };
    fetchUserData();
  }, [setUserType]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const openAvatarMenu = () => setMenuVisible(true);
  const closeAvatarMenu = () => setMenuVisible(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  // Confirmation de déconnexion
  const showLogoutConfirmation = () => {
    closeAvatarMenu();
    setDialogVisible(true);
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    // On supprime le storage
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('bearerToken');

    setDialogVisible(false);
    userType == "guest"
    navigation.navigate('welcome');
  ;}  

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={t('title')} />
        {userType === "authenticated" ? (
          // Si l'utilisateur est connecté, afficher l'avatar
          <Menu
          visible={menuVisible}
          onDismiss={closeAvatarMenu}
          anchor={
            <Appbar.Action
              icon={() => (
                <Image
                  source={avatarImage}
                  style={styles.avatar}
                />
              )}
              onPress={openAvatarMenu}
            />
          }
        >
          <Menu.Item
            onPress={() => navigation.navigate('account')}
            title="Mon compte"
            icon="account"
          />
          <Menu.Item
            onPress={showLogoutConfirmation}
            title="Déconnexion"
            icon="logout"
          />
        </Menu>
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


        {/* Boîte de dialogue de confirmation */}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>{t('logout.confirmTitle')}</Dialog.Title>
            <Dialog.Content>
              <View>
                <Button onPress={handleLogout}>{t('logout.confirmButton')}</Button>
                <Button onPress={() => setDialogVisible(false)}>{t('logout.cancelButton')}</Button>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </>
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
