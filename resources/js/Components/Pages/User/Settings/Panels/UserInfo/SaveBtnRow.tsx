import { Grid, Typography } from "@mui/material";
import { FormikErrors, FormikValues } from "formik/dist/types";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useState } from "react";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../../Common/Gui/Common/Icon";

interface ISaveBtnRow {
  withTitle?: boolean;
  onClick?: () => void;
  errors: FormikErrors<FormikValues>;
}

const SaveBtnRow = ({ errors, onClick, withTitle = false }: ISaveBtnRow) => {
  const { t } = useLaravelReactI18n();
  const [isHover, setIsHover] = useState<boolean>(false);

  const disabled = Object.keys(errors).length > 0;
  const titleBtn = t("Сохранить");

  const onEnter = () => setIsHover(true);
  const onLeave = () => setIsHover(false);

  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={0}
    >
      <Typography variant="subtitle2">
        {withTitle && t("Редактирование")}
      </Typography>

      <Btn
        type="submit"
        color="success"
        webTitle={titleBtn}
        mobTitle={titleBtn}
        disabled={disabled}
        variant={isHover ? "contained" : "outlined"}
        startIcon={<Icon tablerIcon="IconDeviceFloppy"/>}
        icon={<Icon tablerIcon="IconDeviceFloppy"/>}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      />
    </Grid>
  );
};

export default SaveBtnRow;