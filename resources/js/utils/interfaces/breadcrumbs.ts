export interface IBreadcrumbsUrl {
  // k - это regexp
  [k: string]: IBreadcrumbsUrlVal[];
}

export interface IResponseFuncBreadcrumbs {
  title: string,
  titleLangParams?: {
    [k: string]: string | number;
  }
  url?: string;
  icon?: string;
}

export interface IBreadcrumbsUrlVal {
  title?: string | ((loc: object, params: object) => IResponseFuncBreadcrumbs);
  icon?: string;
  breadcrumbs?: (loc: object, params: object) => IResponseFuncBreadcrumbs[];
  // regexp или url
  url?: string;
}

