import store from "../../../store";
import { set } from "../../common/app-init";

export const changeAppInitState = (init: boolean = true, gettingSEO: boolean = false) => {
  store.dispatch(set({
    init: init,
    gettingSEO: gettingSEO
  }));
};
