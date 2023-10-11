import React from 'react'
import { useDispatch } from "react-redux";
import { Snackbar as MUISnackbar } from '@mui/material';
import PropTypes from "prop-types";

export default function Snackbar({ isOpen, autoHideMs, children, onClose }) {
  const d = useDispatch()
  const position = {
    vertical: "top",
    horizontal: "right"
  }

  const _onClose = (e, reason) => {
    // if (reason === 'clickaway' || reason === 'timeout') {
    //     e.preventDefault()
    //     return;
    // }
    d(onClose())
  };

  return (
    <MUISnackbar
      ClickAwayListenerProps={{ onClickAway: () => null }}
      anchorOrigin={position}
      open={isOpen}
      autoHideDuration={autoHideMs}
      onClose={_onClose}
    >
      {children}
    </MUISnackbar>
  );
}

Snackbar.propTypes = {
  isOpen: PropTypes.bool,
  autoHideMs: PropTypes.number,
  children: PropTypes.node,
  onClose: PropTypes.func,
};

Snackbar.defaultProps = {
  isOpen: false,
  autoHideMs: 5000,
  onClose: () => {
  }
};
