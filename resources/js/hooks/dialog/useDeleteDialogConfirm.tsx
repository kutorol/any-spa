import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useState } from "react";
import Btn from "../../Components/Common/Gui/Btn/Btn";
import Icon from "../../Components/Common/Gui/Common/Icon";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";

interface IDeleteConfirmResponse {
  openDeleteDialog: (params?: any) => void,
  deleteDialogTSX: React.ReactNode,
}

const useDeleteDialogConfirm = (onDelete: (params?: any | null) => Promise<boolean>, deleteTitle: string, subText?: string): IDeleteConfirmResponse => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [params, setParams] = useState<any | null>(null);

  const handleClickOpen = (params: any) => {
    setParams(params);
    setOpen(true);
  };
  const handleClose = () => {
    setParams(null);
    setOpen(false);
  };

  const title = t("Вы действительно хотите удалить :deleteTitle?", {
    deleteTitle: deleteTitle
  });

  const titleDelete = t("Удалить");
  const titleCancel = t("Отмена");

  const _onDelete = () => {
    changeFullScreenLoaderState(true);
    onDelete(params).then(res => {
      changeFullScreenLoaderState(false);
      res && handleClose();
    });
  };

  const deleteDialogTSX = (
    <Dialog
      key="deleteDialogTSX"
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
          webTitle={titleDelete}
          mobTitle={titleDelete}
          icon={<Icon tablerIcon="IconTrash"/>}
          variant="contained"
          color="error"
          onClick={_onDelete}
        />
      </DialogActions>
    </Dialog>
  );

  return {
    openDeleteDialog: handleClickOpen,
    deleteDialogTSX: deleteDialogTSX
  };
};

export default useDeleteDialogConfirm;