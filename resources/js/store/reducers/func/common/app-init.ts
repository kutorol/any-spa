import store from "../../../store";
import { set } from "../../common/app-init";

export const changeAppInitState = (init: boolean = true) => {
  store.dispatch(set({
    init: init
  }));
};
