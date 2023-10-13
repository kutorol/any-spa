import { Languages, Roles, Sex } from "../enums/common/enums";

export interface registerFormValuesInterface {
  first_name: string
  last_name: string
  sur_name: string
  email: string
  password: string
  password_confirmation: string
}

export interface resetPassForgotParamsInterface {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface loginPropsInterface {
  email: string
  password: string
}

export interface userSocialAuth {
  auth(re: object, captchaToken: string): Promise<boolean>
  fetchData(url: string, accessToken: string): any
}

export interface googleAuthInterface {
  id: string,
  email: string,
  locale?: string,
  picture?: string,
  family_name?: string,
  given_name?: string,
}

export interface UserInterface {
  uid: number;
  verified_email: boolean;
  full_name: string;
  first_name: string;
  last_name: string;
  surname: string;
  email: string;
  role: Roles;
  locale: Languages;
  is_am_pm: boolean;
  phone?: string;
  sex: Sex;
  avatar?: string;
  age: number;
  roleTitle?: string;
}


