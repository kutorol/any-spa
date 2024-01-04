import TabContext from "@mui/lab/TabContext";
import { Divider } from "@mui/material";
// @ts-ignore
import dayjs from "dayjs";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { redirectParam } from "../../../../store/constant";
import { RootState } from "../../../../store/store";
import { ESex } from "../../../../utils/enums/user";
import { getUrl, navTo } from "../../../../utils/funcs/url";
import userRep from "../../../../utils/repository/user";
import MainCard from "../../../Common/MainCard/MainCard";
import ListHeader from "./ListHeader";
import NotificationPanel from "./Panels/NotificationPanel";
import PasswordPanel from "./Panels/PasswordPanel";
import UserInfoPanel from "./Panels/UserInfoPanel";

interface IUserSettingsPage {
  numTab: 1 | 2 | 3;
}

const UserSettingsPage = ({ numTab }: IUserSettingsPage) => {
  const nav = useNavigate();
  const params = useParams();

  const locationHook = useLocation();
  const user = useSelector((s: RootState) => s.userInfo.user);

  const [value, setValue] = useState<string>(numTab.toString());
  const [userPhone, setUserPhone] = useState<number | "">(user.phone || "");
  const [numEditTab, setNumEditTab] = useState<number>(numTab === 1 && Boolean(params.edit) ? 1 : 0);

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    navTo(`/settings/${newValue}`);
    setValue(newValue);
  };

  const toUrlSettings = getUrl("/settings/1");
  // при обновлении юзера
  const onSubmit = (v: FormikValues): (void | Promise<any>) => {
    userRep.updateInfo(toUrlSettings, {
      phone: userPhone ? userPhone : null,
      name: `${v.last_name} ${v.first_name} ${v.sur_name}`,
      email: v.email,
      is_am_pm: toNumber(v.is_am_pm) === 12,
      sex: v.sex as ESex,
      birthday: v.birthday ? dayjs(v.birthday).format("YYYY-MM-DD") : null,
      gmt: toNumber(v.gmt),
      city: v.city
    }).then((res: any) => {
      if (!res.status) {
        return;
      }

      setNumEditTab(0);
      if (!get(res, `data.${redirectParam}`, null)) {
        nav(toUrlSettings);
      }
    });
  };

  const onSubmitPassword = (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>): (void | Promise<any>) => {
    userRep.updatePass({
      password: v.password as string,
      password_confirmation: v.password_confirmation as string
    });
  };

  const onChangeAvatar = (f: File): void => userRep.changeAvatar(f);

  const isEdit = numEditTab === 1;

  const handleEdit = (value: string): void => {
    nav(`${locationHook.pathname}/edit`);
    setNumEditTab(toNumber(value));
  };

  const onCloseEdit = (e: React.SyntheticEvent): void => {
    e && e.preventDefault();
    nav(toUrlSettings);
  };

  // при переходам по url так же изменяем и табы
  useEffect(() => {
    if (numTab.toString() !== value) {
      setValue(numTab.toString());
      setNumEditTab(0);
    }
  }, [numTab]);

  // если ушли со страницы редактирования
  useEffect(() => {
    if (numEditTab > 0 && locationHook.pathname.indexOf("/edit") === -1) {
      nav(locationHook.pathname.replace("/edit", ""));
      setNumEditTab(0);
      setUserPhone(user.phone || "");
    } else if (locationHook.pathname.indexOf("/edit") !== -1 && numEditTab === 0) {
      setNumEditTab(toNumber(numTab));
    }
  }, [numTab, numEditTab, locationHook.pathname]);

  const mainCardSx = { "& > .MuiCardContent-root": { p: 0, py: 0 } };

  return (
    <MainCard sx={mainCardSx}>
      <TabContext value={value}>
        <ListHeader
          handleChange={handleTabChange}
          numEditTab={numEditTab}
        />

        <Divider/>

        <UserInfoPanel
          value="1"
          handleEdit={handleEdit}
          isEdit={isEdit}
          userPhone={userPhone}
          setUserPhone={setUserPhone}
          onChangeAvatar={onChangeAvatar}
          onSubmit={onSubmit}
          onCloseEdit={onCloseEdit}
        />

        <PasswordPanel
          value="2"
          onSubmit={onSubmitPassword}
        />

        <NotificationPanel value="3"/>
      </TabContext>
    </MainCard>
  );
};

export default UserSettingsPage;