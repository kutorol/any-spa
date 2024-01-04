import { EMenuType } from "../../../utils/enums/menu";
import { IMenuItem } from "../../../utils/interfaces/route";

const logout: IMenuItem = {
  title: "Меню",
  children: <IMenuItem[]>[
    {
      title: "Выйти",
      type: EMenuType.ITEM,
      url: "/logout",
      icon: "IconLogout"
    }
  ]
};

export default logout;