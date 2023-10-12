import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
import Locale from "../../../utils/funcs/locale";

const LocalizatorSetter = () => {
  Locale.locale = useLaravelReactI18n();

  return null;
};

export default LocalizatorSetter;