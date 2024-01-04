import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useState } from "react";
import Btn from "../../Components/Common/Gui/Btn/Btn";
import Icon from "../../Components/Common/Gui/Common/Icon";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";

interface IDeleteConfirmResponse {
  openConfirmDialog: (params?: any) => void,
  confirmDialogTSX: React.ReactNode,
}

const useDialogConfirm = (onConfirm: (params?: any | null) => Promise<boolean>, confirmTitle: string, subText?: string, onCancel?: (params?: any | null) => void): IDeleteConfirmResponse => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [params, setParams] = useState<any | null>(null);

  const handleClickOpen = (params: any) => {
    setParams(params);
    setOpen(true);
  };
  const handleClose = () => {
    onCancel && onCancel(cloneDeep(params));
    setParams(null);
    setOpen(false);
  };

  const title = t("Вы действительно хотите :confirmTitle?", {
    confirmTitle: confirmTitle
  });

  const titleConfirm = t("Подтвердить");
  const titleCancel = t("Отмена");

  const _onConfirm = () => {
    changeFullScreenLoaderState(true);
    onConfirm(params).then(res => {
      changeFullScreenLoaderState(false);
      res && handleClose();
    });
  };

  const confirmDialogTSX = (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogTitle>
        <Typography variant="body1" sx={{ ...theme.typography.h3 }} color="inherit">
          {title}
        </Typography>
      </DialogTitle>

      {subText && (
        <DialogContent>
          <DialogContentText>
            {subText}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Btn
          sx={{ mr: 2 }}
          size="small"
          webTitle={titleCancel}
          mobTitle={titleCancel}
          icon={<Icon tablerIcon="IconX"/>}
          variant="text"
          color="secondary"
          onClick={handleClose}
        />

        <Btn
          size="small"
          webTitle={titleConfirm}
          mobTitle={titleConfirm}
          icon={<Icon tablerIcon="IconCheck"/>}
          variant="contained"
          color="secondary"
          onClick={_onConfirm}
        />
      </DialogActions>
    </Dialog>
  );

  return {
    openConfirmDialog: handleClickOpen,
    confirmDialogTSX: confirmDialogTSX
  };
};

export default useDialogConfirm;