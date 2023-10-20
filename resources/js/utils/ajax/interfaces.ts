export interface ChainCheckHTTPResponse {
  check(res: any): any;
}

export interface TokenInterface {
  setTokens(res: any): void;

  getAccess(): string;

  getRefresh(): string;

  clearToken(redirectTo?: string): void;

  checkTokens(method: (url: string, params: object) => Promise<any>): Promise<any>;
}

export interface RedirectInterface {
  redirectTo(to: string);

  redirectFromAuthRoutes(): void;

  isLogout(): boolean;
}

export interface headersInterface {
  // Хедер авторизации
  Authorization?: string;
  // Хедер какой тип контента
  Accept?: string;

  // Любые параметры
  [ key: string ]: any;
}

export interface getRequestInterface {
  // Если true, успешное сообщение не отобразится
  noSuccessMsg?: boolean;
  // Если > 0, то успешное сообщение будет показано это кол-во времени
  successMsgTimeout?: number;
  // Специфические хедеры, если нужно заменить текущие
  headers?: headersInterface;
  // данные с файлами и всей остальной формой
  formData?: FormData,

  // Любые параметры
  [ key: string ]: any;
}