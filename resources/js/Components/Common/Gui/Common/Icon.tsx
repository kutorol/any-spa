import { useTheme } from "@mui/material/styles";
import * as icons from "@tabler/icons-react";
import * as React from "react";
import { EColor } from "../../../../utils/enums/common";

interface IIcon {
  tablerIcon: string;
  color?: EColor;
  customColor?: string;

  [key: string]: any;
}

const Icon = ({ tablerIcon, color, customColor, ...other }: IIcon) => {
  const theme = useTheme();
  const IconComponent = icons[tablerIcon] || null;
  if (!IconComponent) {
    return null;
  }

  const colors = {
    [EColor.PRIMARY]: theme.palette.primary.main,
    [EColor.SECONDARY]: theme.palette.secondary.main,
    [EColor.ERROR]: theme.palette.error.main,
    [EColor.INFO]: theme.palette.info.main,
    [EColor.WARNING]: theme.palette.warning.main,
    [EColor.SUCCESS]: theme.palette.success.main
  };

  let style = {};
  const c = colors[color] || null;
  if (c || customColor) {
    style = { color: customColor ? customColor : c };
  }

  return (
    <IconComponent
      stroke={1.5}
      size="1.3rem"
      style={style}
      {...other}
    />
  );
};

export default Icon;