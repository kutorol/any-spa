import { List, ListItemButton, ListItemText, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { EColor } from "../../../../../utils/enums/common";
import { IVariantDottedBtn } from "../../../../../utils/interfaces/select";

interface IDottedListItems {
  variants: IVariantDottedBtn[];
  setIsOpen: (v: boolean) => void;
}

const DottedListItems = ({ variants, setIsOpen }: IDottedListItems) => {
  const theme = useTheme();
  const sx = { p: 0, minWidth: "150px" };

  const getSxPrimary = (iconColor?: EColor): object => {
    return {
      "& .MuiListItemText-primary":
      // @ts-ignore
        [EColor.SUCCESS, EColor.ERROR].includes(iconColor)
          ? { color: theme.palette[iconColor].main }
          : {}
    };
  };

  const getIcon = (v: IVariantDottedBtn): React.ReactNode => {
    return v.iconColor
      ? React.cloneElement(v.icon, { color: v.iconColor })
      : v.icon;
  };

  const onClick = (v: IVariantDottedBtn): ((e: React.SyntheticEvent) => void) => {
    return (e: React.SyntheticEvent): void => {
      setIsOpen(false);
      v.onClick(e);
    };
  };

  const items = variants.map((v: IVariantDottedBtn) => {
    const icon = getIcon(v);
    const sxPrimary = getSxPrimary(v.iconColor);

    return (
      <ListItemButton
        key={v.title}
        onClick={onClick(v)}
      >
        <ListItemText
          sx={sxPrimary}
          primary={
            <Stack direction="row" alignItems="center" justifyContent="flex-start">
              {icon} <span style={{ marginLeft: 5 }}>{v.title}</span>
            </Stack>
          }
        />
      </ListItemButton>
    );
  });

  return (
    <List dense sx={sx}>
      {items}
    </List>
  );
};

export default DottedListItems;
