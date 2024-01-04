export const drawerWidth: number = 260;
export const borderRadius: number = 2;
// @ts-ignore
export const GoogleOAuthClientID: string = import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID;
// @ts-ignore
export const GoogleRecaptchaV3SiteKey: string = import.meta.env.VITE_RECAPTCHAV3_SITEKEY;
// @ts-ignore
export const SiteEmailSupport: string = import.meta.env.VITE_SITE_EMAIL_SUPPORT;
// @ts-ignore
export const SiteInn: number = import.meta.env.VITE_SITE_INN;
// @ts-ignore
// Минимальная дата от которой выбираются DatePicker
export const MinDate: string = import.meta.env.VITE_MIN_DATE;
// @ts-ignore
// версия сайта
export const SiteVersion: string = import.meta.env.VITE_SITE_VERSION;
// С какого года запущен в прод
export const WorkFromYear: number = 2024;
// @ts-ignore
export const SiteName: string = import.meta.env.VITE_SITE_NAME;
// Куда редиректить юзера, если email не подтвержден
export const NotVerifyEmailURL: string = "/verify-email";

// Параметр от сервера с данными о юзере
export const userDataParam = "user_data";
// Параметр от сервера со ссылкой на редирект
export const redirectParam = "redirect";
// Параметр от сервера с массивом ошибок
export const errParam = "errs";
// Параметр от сервера с объектом авторизационных ключей
export const tokenParam = "token";
// Авторизационный ключ для обычного доступа
export const accessTokenParam = "access_token";
// Авторизационный ключ для запроса нового обычного ключа с доступом, когда у него закончилось время жизни (сутки)
export const refreshTokenParam = "refresh_token";
// Параметр от сервера с данными, какой язык сейчас выбран у юзера
export const localeParam = "locale";