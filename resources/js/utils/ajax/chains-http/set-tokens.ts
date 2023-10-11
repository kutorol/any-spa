import { get } from "lodash";
import { ChainCheckHTTPResponse, TokenInterface } from "../interfaces";

// Проверка на замену токенов в локальном хранилище
export class ChainCheckSetTokensHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly tokens: TokenInterface
  ) {
  }

  public check(res: any): any {
    // если токены поменялись
    get(res, "data.token_changed", false) && this.tokens.setTokens(res);

    return res;
  }
}
