import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect } from "react";
import useOnEnter from "../../../../../hooks/useOnEnter";
import { TechSupportTypes } from "../../../../../utils/enums/common/enums";
import SelectBlock from "../../../../Common/Gui/Select/Plain/SelectBlock";

interface IStep1 {
  chosenVariant: TechSupportTypes;
  setChosenVariant: (n: any) => void;
  onNextClick: () => void;
}

const Step1 = ({ chosenVariant, setChosenVariant, onNextClick }: IStep1) => {
  const { t } = useLaravelReactI18n();

  const variants: { [key in TechSupportTypes]: string } = {
    [ TechSupportTypes.TYPE_PROBLEM ]: t("Проблема"),
    [ TechSupportTypes.TYPE_SUGGEST ]: t("Предложение"),
    [ TechSupportTypes.TYPE_QUESTION ]: t("Вопрос")
  };

  useOnEnter(onNextClick);

  return (
    <Grid container>
      <Toolbar/>

      <Grid
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SelectBlock
          label={t("Вид запроса")}
          variants={variants}
          onChange={setChosenVariant}
          chosenVariant={chosenVariant}
        />
      </Grid>
    </Grid>
  );
};

export default Step1;