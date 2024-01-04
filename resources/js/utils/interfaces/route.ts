import * as React from "react";
import { EMenuType } from "../enums/menu";
import { ERoles } from "../enums/user";
import { IAvatar } from "./user";

export interface IAllMenuItems {
  items: IMenuItem[],
  admin: IMenuItem[],
  noVerifiedEmail: IMenuItem[],
  anonym: IMenuItem[]
}

export interface IMenuItemChip {
  color?: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  variant?: "filled" | "outlined";
  size?: "small" | "medium";
  label?: React.ReactNode | string;
  avatar?: React.ReactElement | string | IAvatar;
}

export interface IRoute {
  path: string;
  element: React.ReactNode;
  children?: IRoute[];
}

export interface IMenuItem {
  title?: string;
  caption?: string;
  icon?: React.ReactNode | string;
  type?: EMenuType;
  url?: string;
  children?: IMenuItem[];
  // если true, то это ссылка на внешний url
  external?: boolean;
  disabled?: boolean;
  chip?: IMenuItemChip;
  // список шаблонов url, на которых должен быть открыт данный пункт меню
  matchURL?: string[];
  roles?: ERoles[];
  // Если нужно при нажатии сделать специальный вызов
  onAction?: (e?: any, cb?: ((e?: any) => void)) => void;
}
