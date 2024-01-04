import { configureStore } from "@reduxjs/toolkit";
import appInitReducer from "./reducers/common/app-init";
import fullScreenLoaderReducer from "./reducers/common/full-screen-loader";
import seoReducer from "./reducers/common/seo";
import userInfoReducer from "./reducers/common/user";
import errSnackbar from "./reducers/snackbar/error-snackbar";
import infoSnackbar from "./reducers/snackbar/info-snackbar";
import successSnackbar from "./reducers/snackbar/ok-snackbar";
import warningSnackbar from "./reducers/snackbar/warning-snackbar";

const store = configureStore({
  reducer: {
    successSnackbar: successSnackbar,
    errSnackbar: errSnackbar,
    infoSnackbar: infoSnackbar,
    warningSnackbar: warningSnackbar,
    fullScreenLoader: fullScreenLoaderReducer,
    userInfo: userInfoReducer,
    appInit: appInitReducer,
    seo: seoReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export default store;
