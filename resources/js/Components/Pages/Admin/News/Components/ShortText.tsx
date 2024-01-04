import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useMemo } from "react";
import SimpleMDEditor from "react-simplemde-editor";
import CustomAlert from "../../../../Common/Gui/Alert/CustomAlert";
import MainCard from "../../../../Common/MainCard/MainCard";

interface IShortText {
  text: string;
  onChange: (text: string) => void;
}

const ShortText = ({ text, onChange }: IShortText) => {
  const { t } = useLaravelReactI18n();

  const opts = useMemo(() => {
    return {
      spellChecker: false,
      toolbar: false
    };
  }, []);

  return (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <MainCard
        boxShadow
        title={t("Короткий текст")}
        headerSX={{ py: 1.5 }}
      >
        {(text.trim().length === 0) && (
          <Grid item xs={12} sx={{ mb: 3 }}>
            <CustomAlert
              title={t("Короткий текст новости не установлен")}
              subtitleElement={t("Обязательно заполните данное поле")}
            />
          </Grid>
        )}

        <SimpleMDEditor
          value={text}
          onChange={onChange}
          options={opts}
        />
      </MainCard>
    </Grid>
  );
};

export default ShortText;