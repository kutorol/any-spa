import axios from "axios";
import { get, toNumber } from "lodash";
import { changeAppInitState } from "../../store/reducers/common/app-init";
import { changeFullScreenLoaderState } from "../../store/reducers/common/full-screen-loader";
import { createSuccessMgs } from "../../store/reducers/snackbar/ok-snackbar";
import { HTTPMethod } from "../enums/common/enums";
import { ChainCheckErrorsHTTP } from "./chains-http/errors";
import { ChainCheckLocaleHTTP } from "./chains-http/locale";
import { ChainCheckRedirectHTTP } from "./chains-http/redirect";
import { ChainCheckNeedRefreshTokenHTTP } from "./chains-http/refresh-tokens";
import { ChainCheckSetTokensHTTP } from "./chains-http/set-tokens";
import { ChainCheckUserDataHTTP } from "./chains-http/user";
import { ChainCheckHTTPResponse, getRequestInterface, RedirectInterface, TokenInterface } from "./interfaces";
import redirect from "./redirect";
import token from "./token";

// Класс для работы с ajax запросами
class ajax {
  private needInit: boolean = true;

  constructor(
    private readonly tokens: TokenInterface,
    private readonly redirect: RedirectInterface,
    // Цепочки проверок, через которые будет проходить каждый ответ от сервера
    private readonly chains: ChainCheckHTTPResponse[]
  ) {
  }

  // запрос на проверку токенов и получение юзера
  public initApp(): void {
    if (!this.needInit) {
      return;
    }

    this.needInit = false;
    this.tokens.checkTokens(this.get.bind(this)).then(res => {
      changeFullScreenLoaderState(false);
      changeAppInitState(true);
    });
  }

  // GET запрос
  public get(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, HTTPMethod.GET);
  }

  // POST запрос
  public post(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, HTTPMethod.POST);
  }

  // PUT запрос
  public put(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, HTTPMethod.PUT);
  }

  // PATCH запрос
  public patch(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, HTTPMethod.PATCH);
  }

  // DELETE запрос
  public delete(url: string, params: getRequestInterface = {}) {
    return this.commonRequest(url, params, false, HTTPMethod.DELETE);
  }

  // GET запрос на другой сайт
  public getOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, HTTPMethod.GET);
  }

  // POST запрос на другой сайт
  public postOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, HTTPMethod.POST);
  }

  // PUT запрос на другой сайт
  public putOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, HTTPMethod.PUT);
  }

  // PATCH запрос на другой сайт
  public patchOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, HTTPMethod.PATCH);
  }

  // DELETE запрос
  public deleteOutside(url: string, params: getRequestInterface = {}) {
    return this.commonRequestOutside(url, params, HTTPMethod.DELETE);
  }

  // Общий обработчик для всех запросов
  private commonRequest(url: string, params: getRequestInterface, isRepeat: boolean = false, method: HTTPMethod = HTTPMethod.GET): Promise<any> {
    return this.afterRequest(
      this.getRequest(url, params, method),
      url,
      params,
      isRepeat,
      method
    );
  }

  // Общий обработчик для всех запросов от другого сайт
  private commonRequestOutside(url: string, params: getRequestInterface, method: HTTPMethod = HTTPMethod.GET): Promise<any> {
    return this.afterRequestOutside(this.getRequest(url, params, method));
  }

  // Возвращает сам запрос
  private getRequest(url: string, params: getRequestInterface, method: HTTPMethod): Promise<any> {

    const headers = this.getHeaders(params);
    const data: FormData | object = params.formData ? params.formData : this.cleanParams(params);

    let searchParams = '';
    if (method === HTTPMethod.GET) {
      // @ts-ignore
      searchParams = new URLSearchParams(data).toString();
    }

    return axios.request({
      method: method,
      headers: headers,
      url: url + (searchParams ? `?${searchParams}` : ''),
      data: data
    })
      .then(res => res.data)
      .catch(res => get(res, "response.data", {}))
      .then(res => {
        // @ts-ignore
        if (get(res, "status", false) && !params.noSuccessMsg) {
          // @ts-ignore
          createSuccessMgs(get(res, "msg", null), toNumber(params.successMsgTimeout || 3000));
        }

        return res;
      });
  }

  // Очищаем от ненужных данных параметры запроса
  private cleanParams(params: object): object {
    delete params[ "headers" ];
    return params;
  }

  // Возвращает общие хедеры
  private getHeaders = (params: object): object => {
    let headers = { "Accept": "application/json" };
    if (this.tokens.getAccess()) {
      headers[ "Authorization" ] = `Bearer ${this.tokens.getAccess()}`;
    }

    // если есть заголовки в параметрах, то пробрасываем их
    for (const key in (params[ "headers" ] || {})) {
      headers[ key ] = params[ "headers" ][ key ];
    }

    return headers;
  };

  // Обрабатываем запрос и возвращаем его результат
  private async afterRequest(
    request: Promise<any>, // промис от axios
    url: string, // url, куда слать снова запрос
    params: object, // параметры, которые снова отправятся
    isRepeat: boolean = false, // было ли уже повторение запроса
    method: HTTPMethod = HTTPMethod.GET // каким методом отправлять данные (post/delete/patch/put)
    // @ts-ignore
  ): Promise<any> {
    // По очереди проходимся по каждому обработчику
    this.chains.map(chain => request.then(chain.check.bind(chain)));

    // ждем результат запроса
    const responseData = await request;

    // если не повторяли запрос и надо повторить запрос
    if (!isRepeat && responseData && responseData.tryReqAgain) {
      // делаем повторный запрос после обновления токенов
      return this.commonRequest(url, params, true, method);
    }

    // если не надо повторять запрос, то возвращает промис с всегда удачным результатом
    // @ts-ignore
    return new Promise(resolve => resolve(responseData));
  }

  // Обрабатываем запрос от чужого сервиса и возвращаем его результат
  // @ts-ignore
  private async afterRequestOutside(request: Promise<any>): Promise<any> {
    // ждем результат запроса
    const responseData = await request;
    // @ts-ignore
    return new Promise(resolve => resolve(responseData));
  }
}

const r = new ajax(
  token,
  redirect,
  [
    new ChainCheckSetTokensHTTP(token),
    new ChainCheckNeedRefreshTokenHTTP(token),
    new ChainCheckErrorsHTTP(),
    new ChainCheckLocaleHTTP(),
    new ChainCheckUserDataHTTP(redirect),
    new ChainCheckRedirectHTTP(redirect)
  ]
);

export default r;