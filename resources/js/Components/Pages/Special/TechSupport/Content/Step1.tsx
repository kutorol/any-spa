import { Toolbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect } from "react";
import useOnEnter from "../../../../../hooks/useOnEnter";
import { ETechSupportTypes } from "../../../../../utils/enums/tech-support";
import SelectBlock from "../../../../Common/Gui/Select/Plain/SelectBlock";

interface IStep1 {
  chosenVariant: ETechSupportTypes;
  setChosenVariant: (n: any) => void;
  onNextClick: () => void;
}

const Step1 = ({ chosenVariant, setChosenVariant, onNextClick }: IStep1) => {
  const { t } = useLaravelReactI18n();

  const variants: { [key in ETechSupportTypes]: string } = {
    [ETechSupportTypes.TYPE_PROBLEM]: t("Проблема"),
    [ETechSupportTypes.TYPE_SUGGEST]: t("Предложение"),
    [ETechSupportTypes.TYPE_QUESTION]: t("Вопрос")
  };

  useOnEnter(onNextClick);

  const onChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setChosenVariant(e.target.value);
  };

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
          name="type"
          label={t("Вид запроса")}
          variants={variants}
          onChange={onChange}
          chosenVariant={chosenVariant}
        />
      </Grid>
    </Grid>
  );
};

export default Step1;