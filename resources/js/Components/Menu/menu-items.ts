import dashboard from "./dashboard";
import logout from "./item/logout";
import other from "./other";
import pages from "./pages";
import utilities from "./utilities";

// Меню слева
const menuItems = {
  items: [dashboard, pages, utilities, other],
  noVerifiedEmail: [logout]
};

export default menuItems;