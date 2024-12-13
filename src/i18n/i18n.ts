import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translationsNB } from './nb';
import { translationsNN } from './nn';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      nb: {
        translation: translationsNB
      },
      nn: {
        translation: translationsNN
      }
    },
    lng: 'nn', // default language
    fallbackLng: 'nn',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 