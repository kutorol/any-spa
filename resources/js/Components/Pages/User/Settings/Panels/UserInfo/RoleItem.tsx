import { Grid, Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ERoles } from "../../../../../../utils/enums/user";
import { getRoleName } from "../../../../../../utils/funcs/role";
import { IUserInterface } from "../../../../../../utils/interfaces/user";
import Icon from "../../../../../Common/Gui/Common/Icon";

const RoleItem = () => {
  const { t } = useLaravelReactI18n();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  if ([ERoles.USER, ERoles.GUEST].indexOf(user.role) !== -1) {
    return null;
  }

  return (
    <ListItem disablePadding divider disableGutters sx={{ pt: 1, pb: 1.7 }}>
      <ListItemIcon>
        <Icon tablerIcon="IconUserCheck"/>
      </ListItemIcon>
      <ListItemText>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Typography variant={"body1"}>{t("Роль")}</Typography>
          <Typography variant={"subtitle2"}>{getRoleName(user.role)}</Typography>
        </Grid>
      </ListItemText>
    </ListItem>
  );
};

export default RoleItem;