import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../../assets/scss/style.scss";
import RouteList from "../routes/routes";
import { RootState } from "../store/store";
import themes from "../theme/themes";
import r from "../utils/ajax";
import InitCommonComponents from "./Common/InitCommonComponents";
import NavigationScroll from "./Common/NavigationScroll/NavigationScroll";

export default function App() {
  const themeState = themes();
  // запрос на проверку токенов и получение юзера
  useEffect(() => r.initApp(), []);

  const isAppInit: boolean = useSelector((s: RootState) => s.appInit.init);

  useEffect(() => {
    // Устанавливает переменную, по которой бот Яндекса поймет, что spa загрузилась для SEO
    // @ts-ignore
    if (!window.AppIsInit && isAppInit) {
      // @ts-ignore
      window.AppIsInit = true;
    }
  }, [isAppInit]);

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
