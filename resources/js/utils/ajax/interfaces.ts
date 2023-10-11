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

export enum HTTPMethod {
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}