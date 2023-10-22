import store from "../../../store";
import { set } from "../../common/full-screen-loader";

export const changeFullScreenLoaderState = (isActive: boolean = false) => {
  store.dispatch(set({
    active: isActive
  }));
};