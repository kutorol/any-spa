import { IBreadcrumbsUrl } from "../../../../utils/interfaces/breadcrumbs";

// Крошки от "настроек"
const settingsUrls: IBreadcrumbsUrl = {
  "settings\/1": [
    { title: "Настройки", icon: "IconSettings" }
  ],
  "settings\/2": [
    { title: "Настройки", icon: "IconSettings", url: "/settings/1" },
    { title: "Смена пароля", icon: "IconLock" }
  ],
  "settings\/3": [
    { title: "Настройки", icon: "IconSettings", url: "/settings/1" },
    { title: "Уведомления", icon: "IconMail" }
  ],
  "settings\/\\d+\/edit": [
    { title: "Настройки", url: "(\/settings\/\\d+)", icon: "IconSettings" },
    { title: "Редактирование", icon: "IconPencil" }
  ]
};

export default settingsUrls;
