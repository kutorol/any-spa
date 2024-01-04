import { EMenuType } from "../../../utils/enums/menu";
import { toggleLoginPopup, toggleRegisterPopup, toggleSupportTech } from "../../../utils/funcs/event";
import { IMenuItem } from "../../../utils/interfaces/route";

const anonym: IMenuItem = {
  title: "Меню",
  children: <IMenuItem[]>[
    {
      title: "Главная",
      type: EMenuType.ITEM,
      url: "/",
      icon: "IconHome",
      matchURL: [
        "/:lang/administrator"
      ]
    },
    {
      title: "Войти в аккаунт",
      type: EMenuType.ITEM,
      url: "/login",
      icon: "IconLogin2",
      onAction: (e?: any, cb?: ((e?: any) => void)): void => {
        toggleLoginPopup(e);
        cb && cb(e);
      }
    },
    {
      title: "Регистрация",
      type: EMenuType.ITEM,
      url: "/register",
      icon: "IconUserPlus",
      onAction: (e?: any, cb?: ((e?: any) => void)): void => {
        toggleRegisterPopup(e);
        cb && cb(e);
      }
    },
    {
      title: "Забыли пароль?",
      type: EMenuType.ITEM,
      url: "/password/reset",
      icon: "IconKeyOff"
    },
    {
      title: "Новости сайта",
      type: EMenuType.ITEM,
      url: "/news",
      icon: "IconPilcrow"
    },
    {
      title: "Техническая поддержка",
      type: EMenuType.ITEM,
      url: "/support-tech",
      icon: "IconLifebuoy",
      onAction: (e?: any, cb?: ((e?: any) => void)): void => {
        toggleSupportTech(e);
        cb && cb(e);
      }
    }
  ]
};

export default anonym;