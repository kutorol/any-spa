import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { ListItemIcon } from "@mui/material";
import * as React from "react";
import Icon from "../../../../../../Common/Gui/Common/Icon";

interface IIconMenu {
  icon?: string | React.ReactNode;
  level: number;
  menuSelected: boolean;
}

const IconMenu = ({ icon, level, menuSelected }: IIconMenu) => {
  let iconTSX = null;
  if (!icon) {
    const measure = menuSelected ? 8 : 6;
    const sx = { width: measure, height: measure };
    const fontSize = level > 0 ? "inherit" : "medium";

    iconTSX = (
      <FiberManualRecordIcon
        sx={sx}
        fontSize={fontSize}
      />
    );
  }

  if (typeof icon === "string") {
    iconTSX = (
      <Icon tablerIcon={icon}/>
    );
  } else if (iconTSX !== null) {
    iconTSX = icon;
  }

  const sxIcon = { my: "auto", minWidth: icon ? 36 : 18 };
  return (
    <ListItemIcon sx={sxIcon}>{iconTSX}</ListItemIcon>
  );
};

export default IconMenu;