import { ERoles } from "../enums/user";
import Locale from "./locale";

export const getRoleName = (role: ERoles): string => {
  const { t } = Locale.locale;
  const roles: { [key in ERoles]: string } = {
    [ERoles.ADMIN]: t("Администратор"),
    [ERoles.SITE_ADMIN]: t("Администратор сайта"),
    [ERoles.SITE_MANAGER]: t("Менеджер сайта"),
    [ERoles.MANAGER]: t("Менеджер"),
    [ERoles.EMPLOYEE]: t("Сотрудник"),
    [ERoles.USER]: t("Пользователь"),
    [ERoles.GUEST]: t("Аноним"),
    [ERoles.TEST_USER]: t("Тестовый пользователь")
  };

  return roles[role];
};