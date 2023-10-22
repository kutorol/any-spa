import store from "../../../store";
import { set } from "../../menu/left-menu";

export const changeLeftMenu = (isOpen: boolean = true) => {
  store.dispatch(set({
    isOpen: isOpen
  }));
};