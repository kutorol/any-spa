import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Btn from "../../../../Common/Gui/Btn/Btn";
import RoundBtn from "../../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../../Common/Gui/Common/Icon";

interface IImage {
  src: string;
  divider?: boolean;
  onDelete?: (src: string) => void;
  setBackdropImageSrc?: (src: string | null) => void;
  onCopy: (text: string, onSuccess?: () => void) => void;
}

const Image = ({ src, divider, onDelete, setBackdropImageSrc, onCopy }: IImage) => {
  const { t } = useLaravelReactI18n();
  const _onDelete = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    onDelete(src);
  };

  const _setBackdropImageSrc = (e: React.SyntheticEvent) => {
    e && e.preventDefault();
    setBackdropImageSrc && setBackdropImageSrc(src);
  };

  const sxItem = { m: 0, p: 0, py: 1 };
  const sxAvatar = { height: 50, width: "auto", maxWidth: 50, cursor: "pointer" };

  const splitSrc = src.split("/");
  const fileName = splitSrc[splitSrc.length - 1];
  const clickCopy = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onCopy(src);
  };

  return (
    <ListItem
      alignItems="center"
      divider={divider}
      dense
      secondaryAction={
        onDelete ? (
          <RoundBtn
            size="small"
            color="error"
            icon={<Icon tablerIcon="IconTrashFilled"/>}
            onClick={_onDelete}
          />
        ) : undefined
      }
      sx={sxItem}
    >
      <ListItemAvatar>
        <Avatar
          sx={sxAvatar}
          variant="square"
          src={src}
          onClick={_setBackdropImageSrc}
        />
      </ListItemAvatar>

      <Tooltip title={t("Копировать ссылку")}>
        <ListItemText
          inset
          primary={
            <Btn
              webTitle={fileName}
              mobTitle={fileName}
              icon={<Icon tablerIcon="IconCopy"/>}
              onClick={clickCopy}
            />
          }
        />
      </Tooltip>
    </ListItem>
  );
};

export default Image;