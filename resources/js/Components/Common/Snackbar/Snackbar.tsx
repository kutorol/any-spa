import { Snackbar as MUISnackbar } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";

interface ISnackbar {
  isOpen: boolean;
  autoHideMs: number;
  onClose: () => any;
  children: any;
}

export default function Snackbar({
                                   isOpen = false, autoHideMs = 5000, children, onClose = (): any => {
  }
                                 }: ISnackbar) {
  const d = useDispatch();
  const position = {
    vertical: "top",
    horizontal: "right"
  };

  const _onClose = (e, reason?: "clickaway" | "timeout" | "escapeKeyDown") => {
    // if (reason === 'clickaway' || reason === 'timeout') {
    //     e.preventDefault()
    //     return;
    // }
    d(onClose());
  };

  return (
    <MUISnackbar
      ClickAwayListenerProps={{ onClickAway: () => null }}
      // @ts-ignore
      anchorOrigin={position}
      open={isOpen}
      autoHideDuration={autoHideMs}
      onClose={_onClose}
    >
      {children}
    </MUISnackbar>
  );
}
