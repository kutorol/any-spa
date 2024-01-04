// @ts-ignore
import dayjs from "dayjs";
import ContextInterface from "laravel-react-i18n/src/interfaces/context";
import ReplacementsInterface from "laravel-react-i18n/src/interfaces/replacements";
import { ELanguages } from "../enums/user";

interface ILocale {
  locale: null | ContextInterface;
}

// Класс, чтобы пользоваться сменой языка не только через хуки
const Locale: ILocale = { locale: null };
export default Locale;

// Устанавливает язык для приложения и дат
export const changeLocale = (l: ELanguages): void => {
  Locale.locale.setLocale(l.toString());
  dayjs.locale(l.toString());
};

// Возвращает название выбранного языка
export const getLocaleName = (lang: ELanguages): string => {
  const langs: { [key in ELanguages]: string } = {
    [ELanguages.RU]: __("Русский"),
    [ELanguages.EN]: __("Английский")
  };

  return langs[lang];
};

// Перевод текста
export const __ = (v: string, params?: ReplacementsInterface): string => {
  return Locale.locale.t(v, params);
};

// Перевод текста из нескольких вариантов по числу
export const __c = (v: string, number: number, params?: ReplacementsInterface): string => {
  return Locale.locale.tChoice(v, number, params);
};