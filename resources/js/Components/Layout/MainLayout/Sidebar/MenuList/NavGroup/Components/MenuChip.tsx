import { Avatar, Chip } from "@mui/material";
import { get } from "lodash";
import * as React from "react";
import { IMenuItemChip } from "../../../../../../../utils/interfaces/route";
import { IAvatar } from "../../../../../../../utils/interfaces/user";

interface IMenuChip {
  chip?: IMenuItemChip;
}

const MenuChip = ({ chip }: IMenuChip) => {
  if (!chip) {
    return null;
  }

  let avatar;
  const avatarData = get(chip, "avatar", null);
  if (get(avatarData, "src", null)) {
    const infoAvatar: IAvatar = avatarData;
    avatar = (<Avatar src={infoAvatar.src} alt={infoAvatar.alt || ""}/>);
  } else if (typeof avatarData === "string") {
    avatar = (<Avatar>{avatarData}</Avatar>);
  } else if (avatarData !== null) {
    avatar = avatarData;
  }

  return (
    <Chip
      color={chip.color}
      variant={chip.variant}
      size={chip.size}
      label={chip.label}
      avatar={avatar}
    />
  );
};

export default MenuChip;