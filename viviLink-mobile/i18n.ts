import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation: en,
      },
      fr: {
        translation: fr,
      },
    },
    lng: Localization.locale, // Set the language to the device's locale
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
