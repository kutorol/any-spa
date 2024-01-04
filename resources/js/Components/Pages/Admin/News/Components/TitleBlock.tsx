import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import CustomAlert from "../../../../Common/Gui/Alert/CustomAlert";
import CustomInput from "../../../../Common/Inputs/CustomInput";
import MainCard from "../../../../Common/MainCard/MainCard";

interface ITitleBlock {
  newsTitle: string;
  setNewsTitle: (e: React.SyntheticEvent) => void;
}

const TitleBlock = ({ newsTitle, setNewsTitle }: ITitleBlock) => {
  const { t } = useLaravelReactI18n();
  const titleValues = { title: newsTitle };

  return (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <MainCard
        boxShadow
        title={t("Название новости")}
        headerSX={{ py: 1.5 }}
      >
        {(newsTitle.trim().length === 0) && (
          <Grid item xs={12} sx={{ mb: 3 }}>
            <CustomAlert
              title={t("Название новости не установленно")}
              subtitleElement={t("Обязательно заполните данное поле")}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <CustomInput
            name="title"
            title={t("Название новости")}
            handleChange={setNewsTitle}
            values={titleValues}
            maxLength={255}
            showLeftChars
          />
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default TitleBlock;