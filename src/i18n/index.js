import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './translations/translations.en.json';
import translationAR from './translations/translations.ar.json';
import translationFr from './translations/translation.fr.json';
const locales = ['en', "ar",'fr'];
let defaultLanguage = "fr";

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
  fr: {
    translation: translationFr
  }

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: defaultLanguage,
    locales,
    keySeparator:false,  // to support nested translations

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;