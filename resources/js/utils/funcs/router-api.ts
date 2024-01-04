// Класс, чтобы пользоваться навигацией не только через хуки
import { NavigateFunction } from "react-router/dist/lib/hooks";
import { ELanguages } from "../enums/user";

interface IRouterAPI {
  nav: null | NavigateFunction;
  params: {
    lang: string;
  };
}

const RouterAPI: IRouterAPI = {
  nav: null,
  params: { lang: ELanguages.RU.toString().toLowerCase() }
};

export default RouterAPI;