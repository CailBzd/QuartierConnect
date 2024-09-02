import React, { useEffect, useState }  from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, Title, Paragraph } from "react-native-paper";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Index() {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Faire une requête à l'API pour récupérer le nom de l'organisation
    // axios.get('http://192.168.192.1:7788/organizations')
    axios.get('http://192.168.1.59:7788/organizations')
      .then(response => {
        console.log(response);
        setOrganizations(response.data);
      })
      .catch(error => {
        console.error('Error fetching organization name:', error);
      });
  }, []);

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
      
      {organizations.map(org => (
        <Text key={org.id} style={styles.organizationName}>
          {org.name}
        </Text>
         ))}
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
  organizationName: {
    fontSize: 18,
    marginVertical: 5,
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
