import { Divider, List } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { EMenuType } from "../../../../../../utils/enums/menu";
import { ERoles } from "../../../../../../utils/enums/user";
import { IMenuItem } from "../../../../../../utils/interfaces/route";
import TitleGroup from "./Components/TitleGroup";
import NavCollapse from "./NavCollapse";
import NavItem from "./NavItem";

interface INavGroup {
  item: IMenuItem;
}

const NavGroup = ({ item }: INavGroup) => {
  const userRole: ERoles = useSelector((s: RootState) => s.userInfo.user.role);

  // права не подходят
  // @ts-ignore
  if (item.roles && !item.roles.includes(userRole)) {
    return null;
  }

  const items: React.ReactNode[] = (item.children || []).map((menu: IMenuItem, i: number): React.ReactNode | null => {
    // права не подходят
    // @ts-ignore
    if (menu.roles && !menu.roles.includes(userRole)) {
      return null;
    }

    if (menu.type === EMenuType.COLLAPSE) {
      return (
        <NavCollapse
          key={i}
          menu={menu}
          level={1}
        />
      );
    }

    if (menu.type === EMenuType.ITEM) {
      return (
        <NavItem
          key={i}
          item={menu}
          level={1}
        />
      );
    }

    return null;
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <List
        subheader={<TitleGroup title={item.title} subtitle={item.caption}/>}
      >
        {items}
      </List>

      <Divider sx={{ mt: 0.25, mb: 1.25 }}/>
    </>
  );
};

export default NavGroup;