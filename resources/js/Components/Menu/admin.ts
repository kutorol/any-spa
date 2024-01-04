import { EMenuType } from "../../utils/enums/menu";
import { ERoles } from "../../utils/enums/user";
import { IMenuItem } from "../../utils/interfaces/route";

const adminClientSide: IMenuItem = {
  title: "Админка",
  children: <IMenuItem[]>[
    {
      title: "Админка",
      type: EMenuType.ITEM,
      url: "/admin/main",
      icon: "IconLockCheck"
    }
  ]
};

export const adminSide: IMenuItem = {
  children: <IMenuItem[]>[
    {
      title: "На сайт",
      type: EMenuType.ITEM,
      url: "/",
      icon: "IconChevronLeft"
    }
  ]
};

export const adminContents: IMenuItem = {
  title: "Контент сайта",
  children: <IMenuItem[]>[
    {
      title: "Новости сайта",
      type: EMenuType.COLLAPSE,
      icon: "IconPilcrow",
      children: [
        {
          title: "Создать",
          type: EMenuType.ITEM,
          url: "/admin/news/create",
          icon: "IconPlus"
        },
        {
          title: "Все новости",
          type: EMenuType.ITEM,
          url: "/admin/news/list",
          icon: "IconList",
          matchURL: [
            "/:lang/admin/news/:id"
          ]
        }
      ]
    },
    {
      title: "Перевод страниц",
      type: EMenuType.ITEM,
      icon: "IconLanguage",
      url: "/admin/page-i18n"
    },
    {
      title: "Фичетоглы",
      type: EMenuType.ITEM,
      icon: "IconToggleRight",
      url: "/admin/toggle"
    },
    {
      title: "A/B тесты",
      type: EMenuType.ITEM,
      icon: "IconAB",
      url: "/admin/ab"
    },
    {
      title: "Логи",
      type: EMenuType.ITEM,
      icon: "IconHeartbeat",
      url: "/admin/logs",
      matchURL: [
        "/:lang/admin/logs/:id"
      ],
      roles: [ERoles.SITE_ADMIN]
    }
  ]
};

export const adminSpecial: IMenuItem = {
  title: "Помощь",
  children: <IMenuItem[]>[
    {
      title: "Тех. поддержка",
      type: EMenuType.COLLAPSE,
      icon: "IconLifebuoy",
      children: [
        {
          title: "Все запросы",
          type: EMenuType.ITEM,
          url: "/admin/tech-support/list",
          icon: "IconList",
          matchURL: [
            "/:lang/admin/tech-support/:id"
          ]
        }
      ]
    }
  ]
};

export default adminClientSide;