import { IconLogout } from "@tabler/icons-react";

const logout = {
  id: "logout-title-left-menu",
  title: "Меню",
  type: "group",
  children: [
    {
      id: "logout-item-left-menu",
      title: "Выйти",
      type: "item",
      url: "/logout",
      icon: IconLogout,
      breadcrumbs: false
    }
  ]
};

export default logout;