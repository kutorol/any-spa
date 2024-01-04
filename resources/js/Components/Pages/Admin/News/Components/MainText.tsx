import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useMemo } from "react";
import SimpleMDEditor from "react-simplemde-editor";
import { IImageUploadTypeEasyEditor } from "../../../../../utils/interfaces/admin/news";
import CustomAlert from "../../../../Common/Gui/Alert/CustomAlert";
import CustomMarkdown from "../../../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../../../Common/MainCard/MainCard";

interface IMainText {
  text: string;
  onChange: (text: string) => void;
  imageUpload: IImageUploadTypeEasyEditor;
}

const MainText = ({ text, onChange, imageUpload }: IMainText) => {
  const { t } = useLaravelReactI18n();

  const opts = useMemo(() => {
    return {
      spellChecker: false,
      showIcons: ["upload-image", "strikethrough", "table", "code"],
      hideIcons: ["preview", "side-by-side", "fullscreen"],
      uploadImage: true,
      imageUploadFunction: imageUpload
    };
  }, []);

  const alertTSX = (text.trim().length === 0) && (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <CustomAlert
        title={t("Основной текст новости не установлен")}
        subtitleElement={t("Обязательно заполните данное поле")}
      />
    </Grid>
  );
  return (
    <>
      <Grid item md={6} xs={12}>
        <MainCard
          boxShadow
          title={t("Основной текст")}
          headerSX={{ py: 1.5 }}
        >
          {alertTSX}

          <SimpleMDEditor
            value={text}
            onChange={onChange}
            options={opts}
          />
        </MainCard>
      </Grid>

      <Grid item md={6} xs={12}>
        <MainCard
          boxShadow
          title={t("Предпросмотр")}
          headerSX={{ py: 1.5 }}
        >
          {alertTSX}

          <CustomMarkdown
            text={text}
          />
        </MainCard>
      </Grid>
    </>
  );
};

export default MainText;