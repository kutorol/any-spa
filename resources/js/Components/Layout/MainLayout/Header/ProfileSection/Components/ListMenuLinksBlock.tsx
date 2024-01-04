import { Box, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { IMenuLink } from "../PopupList";
import MenuBtnLink from "./MenuBtnLink";

interface IListMenuLinksBlock {
  menuLinks: IMenuLink[];
  clickTo: (e: React.SyntheticEvent) => void;
  handleTogglePopup: () => void;
}

const ListMenuLinksBlock = ({ menuLinks, clickTo, handleTogglePopup }: IListMenuLinksBlock) => {
  const theme = useTheme();

  const items = menuLinks.map((item: IMenuLink, i: number) => (
    <MenuBtnLink
      key={i}
      item={item}
      clickTo={clickTo}
      handleTogglePopup={handleTogglePopup}
    />
  ));

  const listSx = {
    width: "100%",
    maxWidth: 350,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      minWidth: "100%"
    },
    "& .MuiListItemButton-root": {
      mt: 0.5
    }
  };

  const boxListSx = { px: 2, pb: 1 };

  return (
    <Box sx={boxListSx}>
      <List component="nav" sx={listSx}>
        {items}
      </List>
    </Box>
  );
};

export default ListMenuLinksBlock;