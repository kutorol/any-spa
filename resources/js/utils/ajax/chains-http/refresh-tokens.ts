import axios from "axios";
import { get } from "lodash";
import { redirectParam } from "../../../store/constant";
import { ChainCheckHTTPResponse, TokenInterface } from "../interfaces";
import { ChainCheckSetTokensHTTP } from "./set-tokens";

const needRefreshParam = "data.need_refresh_token";

// Проверка на создание новых токенов авторизации через замену токенов
export class ChainCheckNeedRefreshTokenHTTP implements ChainCheckHTTPResponse {
  constructor(
    private readonly tokens: TokenInterface
  ) {
  }

  public check(data: any): any {
    if (!get(data, needRefreshParam, false)) {
      return data;
    }

    if (!this.tokens.getRefresh()) {
      this.tokens.clearToken();
      data.data[redirectParam] = get(data, `data.${redirectParam}`, "/");
      return data;
    }

    let headers = { "headers": { "Accept": "application/json", Authorization: `Bearer ${this.tokens.getRefresh()}` } };

    return axios.post("/api/refresh-token-handle", {}, headers)
      .then(res => res.data)
      .catch(res => get(res, "response.data", {}))
      .then(res => {
        // если токены поменялись
        if (get(res, ChainCheckSetTokensHTTP.TOKEN_CHANGE_PARAM, false)) {
          this.tokens.setTokens(res);
          data.tryReqAgain = true;
          return data;
        }

        this.tokens.clearToken();
        data.data[redirectParam] = get(data, `data.${redirectParam}`, "/");
        return data;
      });
  }
}
