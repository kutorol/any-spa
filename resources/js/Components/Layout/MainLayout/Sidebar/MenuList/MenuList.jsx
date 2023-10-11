import React from 'react'
import { cloneDeep } from 'lodash'
import { Typography } from '@mui/material';
import NavGroup from './NavGroup/NavGroup';
import menuItem from '../../../../Menu/menu-items';
import { useSelector } from "react-redux";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const verifiedEmail = useSelector(state => state.userInfo.user.verified_email);
  const items = verifiedEmail ? cloneDeep(menuItem.items) : cloneDeep(menuItem.noVerifiedEmail);

  const navItems = items.map((item) => {
    switch (item.type) {
      case 'group':
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