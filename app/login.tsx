import React from 'react';
import { View, StyleSheet, Text  } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';  // Importer la navigation

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();  // Utilisation de i18n pour les traductions
  const navigation = useNavigation();  // Utiliser la navigation

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`http://192.168.1.59:7788/api/login`, data);
      alert(t('login.success'));  // Afficher un message après une connexion réussie
      const token = response.data.token;
      const userName = response.data.name;
      console.log(userName);
      await AsyncStorage.setItem('bearerToken', token);      
      await AsyncStorage.setItem('userName', userName);
      // Vous pouvez aussi rediriger vers l'écran d'accueil après le succès
      navigation.navigate('account');
    } catch (error) {
      alert(t('login.error'));  // Afficher un message d'erreur si la connexion échoue
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
        <Text> {/* Envelopper le texte du titre */}
        <Title>{t('login.title')}</Title>
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={t('login.email')}
            value={value}
            onChangeText={onChange}
            error={!!errors.email}
            style={styles.input}
          />
        )}
      />
      {errors.email && <Paragraph style={styles.error}>{errors.email.message}</Paragraph>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={t('login.password')}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={!!errors.password}
            style={styles.input}
          />
        )}
      />
      {errors.password && <Paragraph style={styles.error}>{errors.password.message}</Paragraph>}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        {t('login.button')}  {/* Bouton de connexion */}
      </Button>

      <Button onPress={() => navigation.navigate('register')} style={styles.link}>
        {t('login.no_account')}  {/* Lien pour aller à l'inscription */}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
