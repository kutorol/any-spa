import React from 'react'
import Locale from "../../../utils/funcs/locale";
import { useLaravelReactI18n } from "laravel-react-i18n";

const LocalizatorSetter = () => {
  Locale.locale = useLaravelReactI18n();

  return null
};

export default LocalizatorSetter