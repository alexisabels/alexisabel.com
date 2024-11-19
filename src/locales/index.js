import english from "./en.json";
import spanish from "./es.json";

const LANGUAGES = {
  ENGLISH: 'en',
  SPANISH: 'es',

};

export const getI18N = ({ currentLocale = "es" }) => {
  if (currentLocale === LANGUAGES.ENGLISH) return english;

  return spanish; 
};
