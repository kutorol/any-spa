import { Button } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { borderRadius } from "../../../store/constant";
import { createWarningMgs } from "../../../store/reducers/func/snackbar/warning-snackbar";
import Icon from "../Gui/Common/Icon";
import WebOrMobileBox from "../Gui/WebOrMobileBox";

interface IDragZone {
  titleWeb: string;
  titleMobile: string;
  titleOnDrag: string;
  onChange: (files: File[]) => void;
  multiple?: boolean;
  accept?: { [key: string]: any };
  onValidationFiles?: (f: File[]) => File[] | string | false;
}

const DragZone = ({
                    titleWeb,
                    titleMobile,
                    titleOnDrag,
                    onChange,
                    multiple = false,
                    accept = { "image/*": [".png", ".jpg", ".jpeg"] },
                    onValidationFiles = (files: File[]) => files
                  }: IDragZone) => {
  const { t } = useLaravelReactI18n();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      createWarningMgs(t("Вы не выбрали ни один файл"), 4000);
      return;
    }

    const validFilesOrError = onValidationFiles(acceptedFiles);
    if (validFilesOrError === false) {
      return;
    }

    if (typeof validFilesOrError === "string") {
      createWarningMgs(validFilesOrError, 4000);
      return;
    }

    onChange(validFilesOrError);
  }, [onValidationFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // @ts-ignore
    onDrop: onDrop,
    accept: accept,
    multiple: multiple
  });

  const variant = isDragActive ? "contained" : "outlined";
  const sx = {
    minHeight: 100,
    borderRadius: borderRadius
  };

  const icon = <Icon tablerIcon="IconCameraPlus"/>;

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />

      <Button
        sx={sx}
        color="secondary"
        fullWidth
        variant={variant}
        startIcon={icon}
      >
        {isDragActive
          ? titleOnDrag
          : (
            <WebOrMobileBox mobileComponent={titleMobile}>
              {titleWeb}
            </WebOrMobileBox>
          )
        }
      </Button>
    </div>
  );
};

export default DragZone;