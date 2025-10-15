import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: {
    translation: {
      "archive": "Archive",
      "selected_items": "{{count}} item(s) selected",
      "change_to_dark_theme": "Switch to Dark Theme",
      "change_to_light_theme": "Switch to Light Theme",
      "logout": "Logout",
    }
  },

  pt: {
    translation: {
      
      "archive": "Arquivar",
      "selected_items": "{{count}} item(s) selecionado(s)",
      "change_to_dark_theme": "Mudar para Tema Escuro",
      "change_to_light_theme": "Mudar para Tema Claro",
      "logout": "Sair"
    }
  }
};
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;