import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Menu, Button } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    closeMenu();
  };

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="ViviLink" />
      <Appbar.Action icon="login" onPress={() => alert(t('login'))} />
      <Appbar.Action icon="account-plus" onPress={() => alert(t('sign_up'))} />
      
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
});
