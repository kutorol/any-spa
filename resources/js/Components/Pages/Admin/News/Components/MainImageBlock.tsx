import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import CustomAlert from "../../../../Common/Gui/Alert/CustomAlert";
import DragZone from "../../../../Common/Inputs/DragZone";
import MainCard from "../../../../Common/MainCard/MainCard";

interface IMainImageBlock {
  mainImage: File | string | null;
  setBackdropImageSrc?: (src: string | null) => void;
  onChangeMainImage: (f: File) => void;
}

const MainImageBlock = ({ mainImage, onChangeMainImage, setBackdropImageSrc }: IMainImageBlock) => {
  const { t } = useLaravelReactI18n();

  const mainImageSrc = mainImage
    ? (typeof mainImage === "string" ? mainImage : URL.createObjectURL(mainImage))
    : null;

  const onValidationMainImage = (files: File[]): File[] | string | false => {
    if (files.length === 0) {
      return t("Вы не выбрали ни одной картинки");
    }
    if (files.length > 1) {
      createWarningMgs(t("Загрузить можно только одну картинку"));
    }

    const f = files[0];
    if ((f.size / 1024 / 1024) > 10) {
      return t("Загрузить можно максимум 10Mb");
    }

    return [f];
  };

  const _onChangeMainImage = (files: File[]): void => {
    onChangeMainImage(files[0]);
  };

  return (
    <Grid item xs={12} sx={{ mb: 3 }}>
      <MainCard
        boxShadow
        title={t("Картинка новости")}
        headerSX={{ py: 1.5 }}
      >
        {mainImageSrc ? (
          // @ts-ignore
          <Grid item xs={12} sx={{ mb: 3 }} align="center">
            <img
              src={mainImageSrc}
              width={200}
              alt="main news image"
              style={{ cursor: "pointer" }}
              onClick={e => setBackdropImageSrc(mainImageSrc)}
            />
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ mb: 3 }}>
            <CustomAlert
              title={t("Главная картинка не установлена")}
              subtitleElement={t("Обязательно заполните данное поле")}
            />
          </Grid>
        )}

        <Grid item xs={12} sx={{ mb: 3 }}>
          <DragZone
            titleWeb={t("Перетащите картинку или нажмите на это поле")}
            titleMobile={t("Нажмите, чтобы выбрать картинку")}
            titleOnDrag={t("Отпустите картинку")}
            onValidationFiles={onValidationMainImage}
            onChange={_onChangeMainImage}
          />
        </Grid>
      </MainCard>
    </Grid>
  );
};

export default MainImageBlock;