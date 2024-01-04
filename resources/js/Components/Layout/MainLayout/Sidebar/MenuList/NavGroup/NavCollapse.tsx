import { get, trimStart } from "lodash";
import { match, pathToRegexp } from "path-to-regexp";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getUrl } from "../../../../../../utils/funcs/url";
import { IMenuItem } from "../../../../../../utils/interfaces/route";
import CollapseIcon from "./Components/CollapseIcon";
import CollapseMenus from "./Components/CollapseMenus";
import CustomListItemButton from "./Components/CustomListItemButton";
import IconMenu from "./Components/IconMenu";
import TitlesBlock from "./Components/TitlesBlock";

interface INavCollapse {
  menu: IMenuItem;
  level: number;
}

const NavCollapse = ({ menu, level }: INavCollapse) => {
  const loc = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isMenuOpen = (item: IMenuItem): boolean => {
    const isOpen = getUrl(item.url) === loc.pathname;
    if (isOpen) {
      return true;
    }

    // @ts-ignore
    const isFindByRegExp = (item.matchURL || []).findIndex((regUrl: string): boolean => {
      const regex = pathToRegexp(`/${trimStart(regUrl, "/")}`);
      const res = match(regex, { decode: decodeURIComponent })(loc.pathname);

      return Boolean(res);
    }) > -1;

    if (isFindByRegExp) {
      return true;
    }

    // @ts-ignore
    return (item.children || []).findIndex((child: IMenuItem): boolean => isMenuOpen(child)) > -1;
  };

  useEffect(() => {
    setIsOpen(isMenuOpen(menu));
  }, [loc, menu]);

  const url = getUrl(get(menu, "children.0.url", ""));

  if (get(menu, "children", []).length === 0) {
    return null;
  }

  return (
    <>
      <CustomListItemButton
        menuSelected={isOpen}
        level={level}
        onClick={handleClick}
        disabled={menu.disabled}
        component={Link}
        to={url}
      >
        <IconMenu
          icon={menu.icon}
          level={level}
          menuSelected={isOpen}
        />

        <TitlesBlock
          title={menu.title}
          subtitle={menu.caption}
          menuSelected={isOpen}
        />

        <CollapseIcon isOpen={isOpen}/>
      </CustomListItemButton>

      <CollapseMenus
        isOpen={isOpen}
        level={level}
        subMenus={menu.children}
      />
    </>
  );
};

export default NavCollapse;