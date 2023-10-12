import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../../assets/scss/style.scss";
import RouteList from "../routes/routes";
// инициализируем проверку токенов
import config from "../store/config";
import themes from "../theme/themes";
// инициализируем проверку токенов
import r from "../utils/ajax";
import InitCommonComponents from "./Common/InitCommonComponents";
import NavigationScroll from "./Common/NavigationScroll/NavigationScroll";

export default function App() {
  const themeState = themes(config);
  // запрос на проверку токенов и получение юзера
  r.initApp();

  // @ts-ignore
  const isAppInit = useSelector(s => s.appInit.init);

  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themeState}>
          <CssBaseline/>
          <NavigationScroll>
            <InitCommonComponents/>
            {isAppInit && (<RouteList/>)}
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}
