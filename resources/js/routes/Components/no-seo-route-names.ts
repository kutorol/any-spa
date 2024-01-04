export interface IExceptRoutesInfo {
  // Регулярка для проверки, что текущий URL подходит под это выражение
  regex: string;
  // Если нужно данный URL редиректнуть, то надо запрашивать данный redirectURL
  redirectURL?: string;
}

export interface IExceptRoutes {
  [k: string]: IExceptRoutesInfo;
}

// те роуты, у которых не нужно запрашивать seo данные
export const exceptRoutes = {
  infoNews: { regex: "/news/:id/:slug?", redirectURL: "/news" }
};