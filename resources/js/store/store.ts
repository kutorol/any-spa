import { configureStore } from "@reduxjs/toolkit";
import appInitReducer from "./reducers/common/app-init";
import fullScreenLoaderReducer from "./reducers/common/full-screen-loader";
import localeReducer from "./reducers/common/locale";
import userInfoReducer from "./reducers/common/user";
import leftMenuReducer from "./reducers/menu/left-menu";
import errSnackbar from "./reducers/snackbar/error-snackbar";
import infoSnackbar from "./reducers/snackbar/info-snackbar";
import successSnackbar from "./reducers/snackbar/ok-snackbar";
import warningSnackbar from "./reducers/snackbar/warning-snackbar";

export default configureStore({
  reducer: {
    successSnackbar: successSnackbar,
    errSnackbar: errSnackbar,
    infoSnackbar: infoSnackbar,
    warningSnackbar: warningSnackbar,
    locale: localeReducer,
    fullScreenLoader: fullScreenLoaderReducer,
    userInfo: userInfoReducer,
    leftMenu: leftMenuReducer,
    appInit: appInitReducer
  }
});
