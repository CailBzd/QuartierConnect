import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Organization } from '../types';

export default function AccountScreen() {
  const [organizations, setOrganizations] = useState<Organization[]>([]); // Stocker les organisations
  const [loading, setLoading] = useState(true); // Gérer l'état de chargement
  const [error, setError] = useState<string | null>(null); // Gérer les erreurs
  const [name, setName] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const token = await AsyncStorage.getItem('bearerToken'); // Récupérer le Bearer token
        const userName = await AsyncStorage.getItem('userName'); // Récupérer le User name
        setName(userName);
        if (token) {
          const response = await axios.get<Organization[]>('http://192.168.1.59:7788/api/organizations', {
            headers: {
              Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
            },
          });
          setOrganizations(response.data); // Mettre à jour les organisations avec les données reçues
        } else {
          console.log('No token found');
          setError(t('account.token_not_found'));
        }
      } catch (error) {
        console.error('Error fetching organizations', error);
        setError(t('account.fetch_error'));
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchOrganizations();
  }, []);

  if (loading){
    return ( 
      <View style={styles.container}>
        <Text>
          {t('account.loading')}
        </Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('account.welcome')}{', '}{name}{'!'}</Text>
      {/* Ajoutez ici plus de contenu pour la page de compte utilisateur */}
      <Text style={styles.title}>{t('account.organizations')}</Text>
      {organizations.length > 0 ? (
        organizations.map((org) => (
        <View key={org.id} style={styles.container}>
          <Text>{org.name}</Text>
          </View>
      ))
    ) : (
      <Text>{t('account.no_organizations')}</Text>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  organization: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: 18,
  },
});
