import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Paragraph } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

// Schéma de validation pour les champs
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')  // Validation pour correspondre au mot de passe
    .required('Please confirm your password'),
});

export default function RegisterScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),  // Utilisation du schéma yup pour la validation
  });
  const { t } = useTranslation();
  const navigation = useNavigation();  // Pour rediriger après enregistrement

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://192.168.1.59:7788/api/register', {
        email: data.email,
        password: data.password,
      });
      alert(t('register.success'));
      navigation.navigate('login');  // Redirige vers la page de connexion après l'inscription réussie
    } catch (error) {
      alert(t('register.error'));
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Title>{t('register.title')}</Title>

      {/* Champ de l'email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={t('register.email')}
            value={value}
            onChangeText={onChange}
            error={!!errors.email}
            style={styles.input}
          />
        )}
      />
      {errors.email && <Paragraph style={styles.error}>{errors.email.message}</Paragraph>}

      {/* Champ du mot de passe */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={t('register.password')}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={!!errors.password}
            style={styles.input}
          />
        )}
      />
      {errors.password && <Paragraph style={styles.error}>{errors.password.message}</Paragraph>}

      {/* Champ de confirmation du mot de passe */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label={t('register.confirm_password')}
            secureTextEntry
            value={value}
            onChangeText={onChange}
            error={!!errors.confirmPassword}
            style={styles.input}
          />
        )}
      />
      {errors.confirmPassword && <Paragraph style={styles.error}>{errors.confirmPassword.message}</Paragraph>}

      {/* Bouton d'inscription */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        {t('register.button')}
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
