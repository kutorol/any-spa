import { Typography } from "@mui/material";
import { cloneDeep } from "lodash";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";
import menuItem from "../../../../Menu/menu-items";
import NavGroup from "./NavGroup/NavGroup";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  // @ts-ignore
  const verifiedEmail = useSelector(s => s.userInfo.user.verified_email);
  const items = verifiedEmail ? cloneDeep(menuItem.items) : cloneDeep(menuItem.noVerifiedEmail);

  const navItems = items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item}/>;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;