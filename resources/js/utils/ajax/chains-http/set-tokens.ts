import { get } from "lodash";
import { ChainCheckHTTPResponse, TokenInterface } from "../interfaces";

// Проверка на замену токенов в локальном хранилище
export class ChainCheckSetTokensHTTP implements ChainCheckHTTPResponse {
  public static readonly TOKEN_CHANGE_PARAM: string = "data.token_changed";

  constructor(
    private readonly tokens: TokenInterface
  ) {
  }

  public check(res: any): any {
    // если токены поменялись
    get(res, ChainCheckSetTokensHTTP.TOKEN_CHANGE_PARAM, false) && this.tokens.setTokens(res);

    return res;
  }
}
