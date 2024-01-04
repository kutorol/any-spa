import { ELanguages } from "../../enums/user";

export interface II18n {
  id: number;
  label: string;
  value: string;
  locale: ELanguages;
  updated_at?: string;
  other_langs?: II18n[];
}

export interface II18nList {
  i18n_list: II18n[];
  page: number;
  totalPages: number;
}