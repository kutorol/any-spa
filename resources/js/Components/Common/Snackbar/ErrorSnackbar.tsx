import MuiAlert from "@mui/material/Alert";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../../../store/reducers/snackbar/error-snackbar";
import { RootState } from "../../../store/store";
import Snackbar from "./Snackbar";

const ErrorSnackbar = () => {
  const errorsObj = useSelector((s: RootState) => s.errSnackbar);
  const { t } = useLaravelReactI18n();

  const isOpen = Array.isArray(errorsObj.errors);
  const autoHideMs = errorsObj.duration || 5000;
  const code = errorsObj.code;
  const elevation = 6;
  const d = useDispatch();

  const _clear = () => d(clear());

  const title = t("Произошла ошибка запроса") + (code > 0 || code.toString().trim() !== "" ? ` (#${code})` : "");

  return (
    <Snackbar
      isOpen={isOpen}
      autoHideMs={autoHideMs}
      onClose={clear}
    >
      <MuiAlert
        elevation={elevation}
        variant="filled"
        severity="error"
        onClose={_clear}
      >
        <div>
          <div>{title}</div>

          <ul>
            {errorsObj.errors && errorsObj.errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
