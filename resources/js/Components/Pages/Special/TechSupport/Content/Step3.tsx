import { Delete as DeleteIcon, PhotoCamera } from "@mui/icons-material";
import { Button, Toolbar, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useOnEnter from "../../../../../hooks/useOnEnter";
import { createWarningMgs } from "../../../../../store/reducers/snackbar/warning-snackbar";
import { mergeUniqArrays } from "../../../../../utils/funcs/array";
import RoundBtn from "../../../../Common/Gui/Btn/RoundBtn";
import WebOrMobileBox from "../../../../Common/Gui/WebOrMobileBox";

interface IStep3 {
  onNextClick: () => void;
  attachments: File[],
  setAttachments: (a: File[]) => void;
}

const Step3 = ({ onNextClick, attachments, setAttachments }: IStep3) => {
  const { t } = useLaravelReactI18n();
  useOnEnter(onNextClick);

  const onDrop = useCallback(acceptedFiles => {
    let files = mergeUniqArrays(acceptedFiles, attachments, "name");
    if (files.length > 3) {
      createWarningMgs(t("Загрузить можно максимум 3 файла"), 4000);
      files = files.slice(0, 3);
    }

    const wasCount = files.length;
    files = files.filter((f: File) => (f.size / 1024 / 1024) <= 10);
    if (wasCount != files.length) {
      createWarningMgs(t("Загрузить можно максимум 10Mb на файл. Остальные файлы не загружены"), 4000);
    }

    setAttachments(files);
  }, [attachments]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] }
  });

  let images = [];
  for (let i = 0; i < attachments.length; i++) {
    const needDivider = i + 1 !== attachments.length;
    images.push(
      <React.Fragment key={i}>
        <ListItem
          disablePadding
          alignItems="center"
          divider={needDivider}
          secondaryAction={
            <RoundBtn
              size="small"
              color="error"
              icon={<DeleteIcon/>}
              onClick={() => {
                // @ts-ignore
                const newAttachments = Array.from(attachments).filter((a, ai) => ai !== i);
                setAttachments(newAttachments);
              }}
            />
          }
        >
          <ListItemAvatar>
            <Avatar
              sx={{ height: 50, width: "auto" }}
              variant="square"
              src={URL.createObjectURL(attachments[ i ])}
            />
          </ListItemAvatar>
          <ListItemText inset primary={attachments[ i ].name}/>
        </ListItem>
      </React.Fragment>
    );
  }

  return (
    <>
      <Toolbar/>
      <Typography align="center" sx={{ m: 1 }} variant="subtitle2">
        {t("Выберите фото")}
      </Typography>

      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <Button
          sx={{ minHeight: 100 }}
          color="primary"
          fullWidth
          variant={isDragActive ? "contained" : "outlined"}
          startIcon={<PhotoCamera/>}
        >
          {isDragActive
            ? t("Отпустите файлы")
            : (
              <WebOrMobileBox mobileComponent={t("Нажмите чтобы выбрать фото")}>
                {t("Перетащите файлы или нажмите на это поле")}
              </WebOrMobileBox>
            )
          }
        </Button>
      </div>

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