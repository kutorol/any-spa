import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import RouteList from '../routes/routes';
import themes from '../theme/themes';
import '../../assets/scss/style.scss';
import NavigationScroll from './Common/NavigationScroll/NavigationScroll';
// инициализируем проверку токенов
import config from "../store/config";
import InitCommonComponents from "./Common/InitCommonComponents";
// инициализируем проверку токенов
import r from "../utils/ajax";
import { useSelector } from "react-redux";

export default function App() {
  const themeState = themes(config);
  // запрос на проверку токенов и получение юзера
  r.initApp()

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
