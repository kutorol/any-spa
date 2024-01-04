import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { IProblemAttachment } from "../../../../../../utils/interfaces/admin/tech-support";
import RoundBtn from "../../../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../../../Common/Gui/Common/Icon";

interface IImage {
  attach: IProblemAttachment;
  divider?: boolean;
  onDeleteAttach: (id: number) => void;
  setBackdropImageUrl: (url: string | null) => void;
}

const Image = ({ attach, divider, onDeleteAttach, setBackdropImageUrl }: IImage) => {
  const _onDelete = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    onDeleteAttach(attach.id);
  };

  const _setBackdropImageUrl = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setBackdropImageUrl(attach.url);
  };

  const sxItem = { m: 0, p: 0, py: 1 };
  const sxAvatar = { height: 50, width: "auto", maxWidth: 50, cursor: "pointer" };
  return (
    <ListItem
      alignItems="center"
      divider={divider}
      dense
      secondaryAction={
        <RoundBtn
          size="small"
          color="error"
          icon={<Icon tablerIcon="IconTrashFilled"/>}
          onClick={_onDelete}
        />
      }
      sx={sxItem}
    >
      <ListItemAvatar>
        <Avatar
          sx={sxAvatar}
          variant="square"
          src={attach.url}
          onClick={_setBackdropImageUrl}
        />
      </ListItemAvatar>

      <ListItemText inset primary={attach.file_name}/>
    </ListItem>
  );
};

export default Image;