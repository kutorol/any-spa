import { Grid, Typography } from "@mui/material";
import List from "@mui/material/List";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { IProblemAttachment } from "../../../../../../utils/interfaces/admin/tech-support";
import Image from "./Image";

interface IImageList {
  attachments?: IProblemAttachment[];
  onDeleteAttach: (id: number) => void;
  setBackdropImageUrl: (url: string | null) => void;
}

const ImageList = ({ attachments, onDeleteAttach, setBackdropImageUrl }: IImageList) => {
  const { t } = useLaravelReactI18n();

  if (!attachments) {
    return null;
  }

  const images = attachments.map((attach: IProblemAttachment, i: number) => {
    const needDivider = i + 1 !== attachments.length;

    return (
      <Image
        key={i}
        attach={attach}
        divider={needDivider}
        onDeleteAttach={onDeleteAttach}
        setBackdropImageUrl={setBackdropImageUrl}
      />
    );
  });

  return (
    <>
      <Grid item xs={12} sx={{ mt: 3, mb: 2 }}>
        <Typography variant="h4">
          {t("Приложенные файлы")}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>{images}</List>
      </Grid>
    </>
  );
};

export default ImageList;