import { Grid, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useCallback } from "react";
import useOnEnter from "../../../../../hooks/useOnEnter";
import { createWarningMgs } from "../../../../../store/reducers/func/snackbar/warning-snackbar";
import { mergeUniqArrays } from "../../../../../utils/funcs/array";
import RoundBtn from "../../../../Common/Gui/Btn/RoundBtn";
import Icon from "../../../../Common/Gui/Common/Icon";
import DragZone from "../../../../Common/Inputs/DragZone";

interface IStep3 {
  onNextClick: () => void;
  attachments: File[],
  setAttachments: (a: File[]) => void;
}

const Step3 = ({ onNextClick, attachments, setAttachments }: IStep3) => {
  const { t } = useLaravelReactI18n();
  useOnEnter(onNextClick);

  const onChangeDropZone = (files: File[]): void => setAttachments(files);

  const onValidationFiles = (files: File[]): File[] | string | false => {
    files = mergeUniqArrays(files, attachments, "name");
    let warningText: string[] = [];
    if (files.length > 3) {
      warningText.push(t("Загрузить можно максимум 3 файла"));
      files = files.slice(0, 3);
    }

    const wasCount = files.length;
    files = files.filter((f: File) => (f.size / 1024 / 1024) <= 10);
    if (wasCount != files.length) {
      warningText.push(t("Загрузить можно максимум 10Mb на файл. Остальные файлы не загружены"));
    }

    if (warningText.length) {
      createWarningMgs(warningText.join("<br><br>"), 5000);
    }

    return files;
  };

  let images = [];
  for (let i = 0; i < attachments.length; i++) {
    const needDivider = i + 1 !== attachments.length;
    images.push(
      <React.Fragment key={i}>
        <ListItem
          alignItems="center"
          divider={needDivider}
          dense
          secondaryAction={
            <RoundBtn
              size="small"
              color="error"
              icon={<Icon tablerIcon="IconTrashFilled"/>}
              onClick={() => {
                // @ts-ignore
                const newAttachments = Array.from(attachments).filter((a, ai) => ai !== i);
                setAttachments(newAttachments);
              }}
            />
          }
          sx={{ m: 0, p: 0, py: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              sx={{ height: 50, width: "auto", maxWidth: 50 }}
              variant="square"
              src={URL.createObjectURL(attachments[i])}
            />
          </ListItemAvatar>
          <ListItemText inset primary={attachments[i].name}/>
        </ListItem>
      </React.Fragment>
    );
  }

  return (
    <>
      <Toolbar/>

      <Grid container alignItems="center" justifyContent="center">
        <Typography sx={{ m: 1 }} variant="subtitle2">
          <Icon tablerIcon="IconCameraPlus"/>
        </Typography>
        <Typography variant="subtitle2">
          <span>{t("Выберите фото")}</span>
        </Typography>
      </Grid>

      <DragZone
        titleWeb={t("Перетащите файлы или нажмите на это поле")}
        titleMobile={t("Нажмите, чтобы выбрать фото")}
        titleOnDrag={t("Отпустите файлы")}
        onValidationFiles={onValidationFiles}
        onChange={onChangeDropZone}
        multiple
      />

      <Toolbar/>

      {(attachments.length > 0) && (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {images}
        </List>
      )}
    </>
  );
};

export default Step3;