import { Avatar, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import Icon from "../../../../Common/Gui/Common/Icon";

interface IIconBtn {
  anchorRef: any;
  handleToggle: (e: any) => void;
}

const IconBtn = ({ anchorRef, handleToggle }: IIconBtn) => {
  const theme = useTheme();

  const sxAvatar = {
    // @ts-ignore
    ...theme.typography.commonAvatar,
    // @ts-ignore
    ...theme.typography.mediumAvatar,
    transition: "all .2s ease-in-out",
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    "&[aria-controls=\"menu-list-grow\"],&:hover": {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.light
    }
  };

  return (
    <ButtonBase>
      <Avatar
        variant="rounded"
        sx={sxAvatar}
        ref={anchorRef}
        onClick={handleToggle}
      >
        <Icon tablerIcon="IconLanguage"/>
      </Avatar>
    </ButtonBase>
  );
};

export default IconBtn;