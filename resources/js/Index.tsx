import { GoogleOAuthProvider } from "@react-oauth/google";
import { LaravelReactI18nProvider } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./Components/App";
import { GoogleOAuthClientID } from "./store/constant";
import store from "./store/store";
import { ELanguages } from "./utils/enums/user";

const fallBackLocale: ELanguages = ELanguages.RU;
const defaultLocale = get(window, "siteLocale", fallBackLocale);

if (document.getElementById("app")) {
  createRoot(document.getElementById("app")).render(
    <LaravelReactI18nProvider
      locale={defaultLocale}
      fallbackLocale={defaultLocale}
      // @ts-ignore
      files={import.meta.glob("/lang/*.json")}
    >
      <GoogleOAuthProvider clientId={GoogleOAuthClientID}>
        <StrictMode>
          <Provider store={store}>
            <App/>
          </Provider>
        </StrictMode>
      </GoogleOAuthProvider>
    </LaravelReactI18nProvider>
  );
}
