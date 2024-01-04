import { ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { ELanguages } from "../../../../../utils/enums/user";
import { getLocaleName } from "../../../../../utils/funcs/locale";

interface IOneLang {
  l: ELanguages;
  onChangeLocale: (l: ELanguages) => void;
}

const OneLang = ({ l, onChangeLocale }: IOneLang) => {
  const userLocale: ELanguages = useSelector((s: RootState) => s.userInfo.user.locale);
  const isCurrenLocale = l === userLocale;

  const onClick = () => onChangeLocale(l);

  return (
    <ListItemButton
      selected={isCurrenLocale}
      disabled={isCurrenLocale}
      onClick={onClick}
    >
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">
              {getLocaleName(l)}
            </Typography>
            <Typography variant="caption">{l.toString().toUpperCase()}</Typography>
          </Stack>
        }
      />
    </ListItemButton>
  );
};

export default OneLang;