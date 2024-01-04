import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { borderRadius } from "../../../../../../store/constant";
import { RootState } from "../../../../../../store/store";
import { getUrl } from "../../../../../../utils/funcs/url";
import Icon from "../../../../../Common/Gui/Common/Icon";
import { IMenuLink } from "../PopupList";
import BreakLine from "./BreakLine";

interface IMenuBtnLink {
  item: IMenuLink;
  clickTo: (e: React.SyntheticEvent) => void;
  handleTogglePopup: () => void;
}

const MenuBtnLink = ({ item, clickTo, handleTogglePopup }: IMenuBtnLink) => {
  const { user, isAppInit } = useSelector((s: RootState) => ({
    user: s.userInfo.user,
    isAppInit: s.appInit.init
  }));
  const sxLink = { borderRadius: borderRadius };

  if (
    !isAppInit
    || (item.anonym && user.uid > 0)
    || (user.uid <= 0 && item.auth)
    || (item.verified && !user.verified_email)
  ) {
    return null;
  }

  const onClick = (e: React.SyntheticEvent): void => {
    item.onClick ? item.onClick(e) : clickTo(e);
    handleTogglePopup && handleTogglePopup();
  };

  return (
    <>
      <ListItemButton
        sx={sxLink}
        onClick={onClick}
        component={Link}
        to={getUrl(item.url)}
      >
        <ListItemIcon>
          <Icon tablerIcon={item.icon}/>
        </ListItemIcon>
        <ListItemText primary={<Typography variant="body2">{item.title}</Typography>}/>
      </ListItemButton>

      {item.divider && (<BreakLine/>)}
    </>
  );
};

export default MenuBtnLink;