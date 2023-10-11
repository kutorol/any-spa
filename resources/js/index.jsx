import React, { StrictMode } from "react";
import { Provider } from 'react-redux'
import store from './store/store'
import { createRoot } from 'react-dom/client';
import App from "./Components/App";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleOAuthClientID, GoogleRecaptchaV3SiteKey } from "./store/constant";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { LaravelReactI18nProvider } from "laravel-react-i18n";

const defaultLocale = window.siteLocale || "ru";

if (document.getElementById('app')) {
  createRoot(document.getElementById('app')).render(
    <LaravelReactI18nProvider
      locale={defaultLocale}
      fallbackLocale={"ru"}
      files={import.meta.glob('/lang/*.json')}
    >
      <GoogleOAuthProvider clientId={GoogleOAuthClientID}>
        <GoogleReCaptchaProvider
          reCaptchaKey={GoogleRecaptchaV3SiteKey}
          useRecaptchaNet={true}
          language={defaultLocale}
          // container={{parameters: { theme: 'dark' }}}
        >
          <StrictMode>
            <Provider store={store}>
              <App/>
            </Provider>
          </StrictMode>
        </GoogleReCaptchaProvider>
      </GoogleOAuthProvider>
    </LaravelReactI18nProvider>
  );
}
