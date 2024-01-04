import { Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import User1 from "../../../../../../../assets/images/svg/users/user-round.svg";
import { RootState } from "../../../../../../store/store";
import { ESex } from "../../../../../../utils/enums/user";
import { humanDate } from "../../../../../../utils/funcs/date";
import { getLocaleName } from "../../../../../../utils/funcs/locale";
import { IUserInterface } from "../../../../../../utils/interfaces/user";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../../Common/Gui/Common/Icon";
import UserAvatar from "../../../../../Common/Gui/Img/UserAvatar";
import RoleItem from "./RoleItem";

interface IMainInfo {
  handleEdit: (e: React.SyntheticEvent) => void;
}

interface IInfo {
  icon: string;
  title: string;
  val: string | number;
}

const MainInfo = ({ handleEdit }: IMainInfo) => {
  const { t } = useLaravelReactI18n();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  const info: IInfo[] = [
    { icon: "IconMail", title: t("E-mail"), val: user.email },
    { icon: "IconDeviceMobile", title: t("Телефон"), val: user.phone || "-/-" },
    {
      icon: "IconBuildingPavilion",
      title: t("Город"),
      val: user.city || "-/-"
    },
    {
      icon: "IconCake",
      title: t("День рождения"),
      val: user.birthday ? humanDate(user.birthday) : "-/-"
    },
    { icon: "IconLanguage", title: t("Язык"), val: `${getLocaleName(user.locale)} (${user.locale})` },
    {
      icon: user.is_am_pm ? "IconClock12" : "IconClock24",
      title: t("Часовой формат"),
      val: t(user.is_am_pm ? "12 часов" : "24 часа")
    },
    { icon: "IconClockBolt", title: t("Часовой пояс"), val: user.gmt >= 0 ? `GMT +${user.gmt}` : `GMT ${user.gmt}` },
    {
      icon: user.sex === ESex.MALE ? "IconGenderMale" : "IconGenderFemale",
      title: t("Пол"),
      val: t(user.sex === ESex.MALE ? "Мужчина" : "Женщина")
    }
  ];

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={1}
      >
        <UserAvatar/>

        <div>{user.full_name}</div>

        <Btn
          icon={<Icon tablerIcon="IconEdit"/>}
          onClick={handleEdit}
        />
      </Grid>

      <Divider/>

      <List>
        <RoleItem/>

        {info.map((row, i) => (
          <ListItem
            key={i}
            sx={{ pt: 1, pb: 1.7 }}
            disablePadding
            divider
            disableGutters
          >
            <ListItemIcon>
              <Icon tablerIcon={row.icon}/>
            </ListItemIcon>
            <ListItemText>
              <Grid container justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"body1"}>{row.title}</Typography>
                <Typography variant={"subtitle2"}>{row.val}</Typography>
              </Grid>
            </ListItemText>
          </ListItem>
        ))}
      </List>

    </>
  );
};

export default MainInfo;