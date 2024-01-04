import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import MainCard from "../../../../Common/MainCard/MainCard";
import ImageList from "./ImageList";

interface IUsedImagesBlock {
  images: string[];
  onDelete?: (src: string) => void;
  setBackdropImageSrc?: (src: string | null) => void;
}

const UsedImagesBlock = ({ images, onDelete, setBackdropImageSrc }: IUsedImagesBlock) => {
  const { t } = useLaravelReactI18n();

  if (images.length === 0) {
    return null;
  }

  return (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <MainCard
        boxShadow
        title={t("Используемые картинки в основном тексте")}
        headerSX={{ py: 1.5 }}
      >
        <ImageList
          imagesSrc={images}
          onDelete={onDelete}
          setBackdropImageSrc={setBackdropImageSrc}
        />
      </MainCard>
    </Grid>
  );
};

export default UsedImagesBlock;