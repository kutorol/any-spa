import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RouterAPI from "../../../utils/funcs/router-api";

const NavigateSetter = () => {
  // устанавливаем хук, чтобы можно было использовать навигацию не только в компонентах
  RouterAPI.nav = useNavigate();
  // @ts-ignore
  RouterAPI.params = useParams();

  return null;
};

export default NavigateSetter;