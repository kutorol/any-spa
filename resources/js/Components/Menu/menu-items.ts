import { IAllMenuItems } from "../../utils/interfaces/route";
import { adminContents, adminSide, adminSpecial } from "./admin";
import anonym from "./item/anonym";
import logout from "./item/logout";

// Меню слева
const menuItems: IAllMenuItems = {
  items: [],
  admin: [adminSide, adminContents, adminSpecial],
  noVerifiedEmail: [logout],
  anonym: [anonym]
};

export default menuItems;