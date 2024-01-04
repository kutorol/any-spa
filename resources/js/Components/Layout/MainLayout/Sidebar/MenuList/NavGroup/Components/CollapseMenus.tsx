import { Collapse, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { EMenuType } from "../../../../../../../utils/enums/menu";
import { IMenuItem } from "../../../../../../../utils/interfaces/route";
import NavCollapse from "../NavCollapse";
import NavItem from "../NavItem";

interface ICollapseMenus {
  isOpen: boolean;
  level: number;
  subMenus?: IMenuItem[];
}

const CollapseMenus = ({ isOpen, level, subMenus }: ICollapseMenus) => {
  const theme = useTheme();
  const sx = {
    position: "relative",
    "&:after": {
      content: "''",
      position: "absolute",
      left: "32px",
      top: 0,
      height: "100%",
      width: "1px",
      opacity: 1,
      background: theme.palette.primary.light
    }
  };

  if (!subMenus) {
    return null;
  }

  const menus = subMenus.map((item: IMenuItem, i: number) => {
    if (item.type === EMenuType.COLLAPSE) {
      return (
        <NavCollapse
          key={i}
          menu={item}
          level={level + 1}
        />
      );
    }

    if (item.type === EMenuType.ITEM) {
      return (
        <NavItem
          key={i}
          item={item}
          level={level + 1}
        />
      );
    }

    return null;
  });

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List
        component="div"
        disablePadding
        sx={sx}
      >
        {menus}
      </List>
    </Collapse>
  );
};

export default CollapseMenus;