import { configureStore } from '@reduxjs/toolkit'
import errSnackbar from "./reducers/snackbar/error-snackbar";
import successSnackbar from "./reducers/snackbar/ok-snackbar";
import warningSnackbar from "./reducers/snackbar/warning-snackbar";
import infoSnackbar from "./reducers/snackbar/info-snackbar";
import localeReducer from "./reducers/common/locale";
import fullScreenLoaderReducer from "./reducers/common/fullScreenLoader";
import userInfoReducer from "./reducers/common/user";
import leftMenuReducer from "./reducers/menu/left-menu";
import appInitReducer from "./reducers/common/app-init";

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
    appInit: appInitReducer,
  },
})
