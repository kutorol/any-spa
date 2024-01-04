import { trimStart } from "lodash";
import { match, pathToRegexp } from "path-to-regexp";
import * as React from "react";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUrl } from "../../../../../../utils/funcs/url";
import { IMenuItem } from "../../../../../../utils/interfaces/route";
import CustomListItemButton from "./Components/CustomListItemButton";
import IconMenu from "./Components/IconMenu";
import MenuChip from "./Components/MenuChip";
import TitlesBlock from "./Components/TitlesBlock";

interface INavItem {
  item: IMenuItem;
  level: number;
}

const NavItem = ({ item, level }: INavItem) => {
  const { pathname } = useLocation();

  const url = getUrl(item.url || "");
  const menuSelected = useMemo(() => {
    if (pathname === url) {
      return true;
    }

    // @ts-ignore
    return (item.matchURL || []).findIndex((regUrl: string): boolean => {
      const regex = pathToRegexp(`/${trimStart(regUrl, "/")}`);
      const res = match(regex, { decode: decodeURIComponent })(pathname);

      return Boolean(res);
    }) > -1;
  }, [pathname]);


  const target = item.external ? "_blank" : undefined;

  const onClick = (e: React.SyntheticEvent): void => {
    item.onAction && item.onAction(e);
  };

  return (
    <CustomListItemButton
      menuSelected={menuSelected}
      level={level}
      disabled={item.disabled}
      component={Link}
      to={url}
      target={target}
      onClick={onClick}
    >
      <IconMenu
        icon={item.icon}
        level={level}
        menuSelected={menuSelected}
      />

      <TitlesBlock
        title={item.title}
        subtitle={item.caption}
        menuSelected={menuSelected}
      />

      <MenuChip chip={item.chip}/>
    </CustomListItemButton>
  );
};

export default NavItem;