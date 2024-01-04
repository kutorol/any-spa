import { ELanguages, ERoles, ESex } from "../enums/user";
import { ITests } from "./ab-tests";

export interface IUpdateUserInfo {
  phone?: number;
  name: string;
  email: string;
  is_am_pm: boolean;
  sex: ESex;
  birthday?: string;
  gmt: number;
  city: string;
}

export interface IPassInfo {
  password: string;
  password_confirmation: string;
}

export interface IUserInterface {
  uid: number;
  verified_email: boolean;
  full_name: string;
  first_name: string;
  last_name: string;
  surname: string;
  email: string;
  role: ERoles;
  locale: ELanguages;
  is_am_pm: boolean;
  phone?: number;
  sex: ESex;
  avatar?: string;
  age: number;
  // дата, когда подтвердил, что соглашается с использованием cookie
  agreement_confirmed_at?: string;
  // день рождение
  birthday?: string;
  // часовой пояс
  gmt: number;
  // город
  city?: string;
  // а/б тесты
  ab_tests?: ITests;
}

export interface IRegisterFormValuesInterface {
  first_name: string;
  last_name: string;
  sur_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: ERoles;
}

export interface IResetPassForgotParamsInterface {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ILoginPropsInterface {
  email: string;
  password: string;
}

export interface IAvatar {
  src?: string;
  alt?: string;
}
