import { cloneDeep, get } from "lodash";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ERoles } from "../../../../../utils/enums/user";
import { IMenuItem } from "../../../../../utils/interfaces/route";
import { IUserInterface } from "../../../../../utils/interfaces/user";
import { isAdminPage } from "../../../../Common/Utils/SeoTitles";
import adminClientSide from "../../../../Menu/admin";
import menuItem from "../../../../Menu/menu-items";
import NavGroup from "./NavGroup/NavGroup";

const MenuList = () => {
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);
  const isAdmin = user.verified_email && isAdminPage();

  let items: IMenuItem[] = cloneDeep(menuItem.anonym);
  if (user.uid > 0) {
    items = isAdmin
      ? cloneDeep(menuItem.admin)
      : (user.verified_email
        ? cloneDeep(menuItem.items)
        : cloneDeep(menuItem.noVerifiedEmail));
  }

  const navItems = items.map((item: IMenuItem, i: number) => {
    if (get(item, "children", []).length === 0) {
      return null;
    }

    return <NavGroup key={i} item={item}/>;
  });

  if (isAdmin || [ERoles.SITE_ADMIN, ERoles.SITE_MANAGER].indexOf(user.role) === -1) {
    return (
      <>
        {navItems}
      </>
    );
  }

  navItems.push(
    <NavGroup
      key="adminClientSide"
      item={adminClientSide}
    />
  );

  return (
    <>
      {navItems}
    </>
  );
};

export default MenuList;