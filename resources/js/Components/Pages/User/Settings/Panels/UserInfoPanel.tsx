import TabPanel from "@mui/lab/TabPanel";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FormikHelpers, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useState } from "react";
// @ts-ignore
import User1 from "../../../../../../assets/images/svg/users/user-round.svg";
import UserAvatar from "../../../../Common/Gui/Img/UserAvatar";
import DragZone from "../../../../Common/Inputs/DragZone";
import MainCard from "../../../../Common/MainCard/MainCard";
import EditInfo from "./UserInfo/EditInfo";
import MainInfo from "./UserInfo/MainInfo";

interface IUserInfoPanel {
  value: string;
  isEdit: boolean;
  userPhone: number | "";
  handleEdit: (v: string) => void;
  setUserPhone: (v: number | "") => void;
  onChangeAvatar: (f: File) => void;
  onSubmit: (v: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => (void | Promise<any>);
  onCloseEdit: (e: React.SyntheticEvent) => void;
}

const UserInfoPanel = ({
                         value,
                         handleEdit,
                         isEdit,
                         userPhone,
                         setUserPhone,
                         onChangeAvatar,
                         onSubmit,
                         onCloseEdit
                       }: IUserInfoPanel) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const containerSx = {
    m: 0,
    p: isEdit ? 3 : 0,
    pb: 0,
    pl: isEdit ? 3 : 1,
    pr: 3,
    color: "#fff"
  };

  const spacing = isEdit ? 0 : 2;
  const xlColumns = isEdit ? 12 : 4;

  const onEdit = e => handleEdit(value);


  const onValidationAvatar = (files: File[]): File[] | string | false => {
    if (files[0].size / 1024 / 1024 > 10) {
      return t("Аватар должен весить максимум 10Mb");
    }

    return files;
  };

  const onChangeAvatarDropZone = (files: File[]): void => onChangeAvatar(files[0]);

  return (
    <TabPanel value={value} sx={{ "&": { p: 0, py: 2 } }}>
      <Grid
        container
        sx={containerSx}
        spacing={spacing}
        style={{ maxWidth: "100%" }}
      >
        <Grid item xs={12} xl={xlColumns} order={{ xs: 3, sm: 1 }}>
          {/* @ts-ignore */}
          <MainCard
            title={isEdit ? null : t("Личная информация")}
            boxShadow
            // @ts-ignore
            shadow={theme.shadows[50]}
            sx={{ "& > .MuiCardContent-root": { p: 3 } }}
          >
            {isEdit ? (
              <EditInfo
                userPhone={userPhone}
                setUserPhone={setUserPhone}
                onSubmit={onSubmit}
                onCloseEdit={onCloseEdit}
              />
            ) : (
              <MainInfo handleEdit={onEdit}/>
            )}
          </MainCard>
        </Grid>

        {(!isEdit) && (
          <>
            <Grid item xl={3} xs={12} order={{ xs: 1, sm: 2 }}>
              <MainCard
                title={t("Аватар")}
                boxShadow
                // @ts-ignore
                shadow={theme.shadows[50]}
                sx={{ "& > .MuiCardContent-root": { p: 3 } }}
              >
                <UserAvatar
                  variant="square"
                  sx={(isHover) => ({
                    // @ts-ignore
                    ...theme.typography.fullAvatar,
                    margin: "8px 0 8px 8px !important",
                    cursor: "pointer"
                  })}
                />
              </MainCard>
            </Grid>
            <Grid item xl={5} xs={12} order={{ xs: 2, sm: 3 }}>
              {/* @ts-ignore */}
              <MainCard
                title={t("Смена аватара")}
                boxShadow
                // @ts-ignore
                shadow={theme.shadows[50]}
                sx={{ "& > .MuiCardContent-root": { p: 3 } }}
              >
                <DragZone
                  titleWeb={t("Перетащите аватарку или нажмите на это поле")}
                  titleMobile={t("Нажмите, чтобы выбрать аватарку")}
                  titleOnDrag={t("Отпустите аватарку")}
                  onValidationFiles={onValidationAvatar}
                  onChange={onChangeAvatarDropZone}
                />
              </MainCard>
            </Grid>
          </>
        )}
      </Grid>

    </TabPanel>
  );
};

export default UserInfoPanel;