import axios from "axios";
import { get, toNumber, trimStart } from "lodash";
import { defaultUser } from "../../store/reducers/common/user";
import { changeAppInitState } from "../../store/reducers/func/common/app-init";
import { changeFullScreenLoaderState } from "../../store/reducers/func/common/full-screen-loader";
import { createSuccessMgs } from "../../store/reducers/func/snackbar/ok-snackbar";
import store from "../../store/store";
import { EHTTPMethod } from "../enums/http";
import { ELanguages } from "../enums/user";
import { getAllABTests } from "../funcs/ab/ab-tests";
import { isCrawler } from "../funcs/detect";
import { changeLocale } from "../funcs/locale";
import { ChainCheckAbTestsHTTP } from "./chains-http/ab-tests";
import { ChainCheckErrorsHTTP } from "./chains-http/errors";
import { ChainCheckLocaleHTTP, isEnumLocale } from "./chains-http/locale";
import { ChainCheckRedirectHTTP } from "./chains-http/redirect";
import { ChainCheckNeedRefreshTokenHTTP } from "./chains-http/refresh-tokens";
import { ChainCheckSetTokensHTTP } from "./chains-http/set-tokens";
import { ChainCheckUserDataHTTP } from "./chains-http/user";
import { ChainCheckVersionHTTP } from "./chains-http/version";
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

  private redirectIfNotRightLangURL(): true | ELanguages {
    let siteLocale = ELanguages.RU;
    let langFromURL = trimStart(window.location.pathname, "/").split("/")[0] as ELanguages;
    if (isEnumLocale(langFromURL)) {
      siteLocale = langFromURL;
    }

    if (siteLocale !== langFromURL) {
      window.location.href = `/${siteLocale}${window.location.pathname}?${window.location.search}`;
      return true;
    }

    return siteLocale;
  }

  // запрос на проверку токенов и получение юзера
  public initApp(): void {
    if (!this.needInit) {
      return;
    }

    const siteLocale: boolean | ELanguages = this.redirectIfNotRightLangURL();
    if (siteLocale === true) {
      return;
    }

    // ставим язык приложения сразу
    changeLocale(defaultUser.locale);

    this.needInit = false;
    this.tokens.checkTokens(this.get.bind(this)).then(res => {
      changeFullScreenLoaderState(false);
      changeAppInitState(true);
    });
  }

  // GET запрос
  public get(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, EHTTPMethod.GET);
  }

  // POST запрос
  public post(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, EHTTPMethod.POST);
  }

  // PUT запрос
  public put(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, EHTTPMethod.PUT);
  }

  // PATCH запрос
  public patch(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequest(url, params, false, EHTTPMethod.PATCH);
  }

  // DELETE запрос
  public delete(url: string, params: getRequestInterface = {}) {
    return this.commonRequest(url, params, false, EHTTPMethod.DELETE);
  }

  // GET запрос на другой сайт
  public getOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, EHTTPMethod.GET);
  }

  // POST запрос на другой сайт
  public postOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, EHTTPMethod.POST);
  }

  // PUT запрос на другой сайт
  public putOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, EHTTPMethod.PUT);
  }

  // PATCH запрос на другой сайт
  public patchOutside(url: string, params: getRequestInterface = {}): Promise<any> {
    return this.commonRequestOutside(url, params, EHTTPMethod.PATCH);
  }

  // DELETE запрос
  public deleteOutside(url: string, params: getRequestInterface = {}) {
    return this.commonRequestOutside(url, params, EHTTPMethod.DELETE);
  }

  // Общий обработчик для всех запросов
  private commonRequest(url: string, params: getRequestInterface, isRepeat: boolean = false, method: EHTTPMethod = EHTTPMethod.GET): Promise<any> {
    return this.afterRequest(
      this.getRequest(url, params, method),
      url,
      params,
      isRepeat,
      method
    );
  }

  // Общий обработчик для всех запросов от другого сайт
  private commonRequestOutside(url: string, params: getRequestInterface, method: EHTTPMethod = EHTTPMethod.GET): Promise<any> {
    params.isOutside = true;
    return this.afterRequestOutside(this.getRequest(url, params, method));
  }

  // Возвращает сам запрос
  // @ts-ignore
  private async getRequest(url: string, params: getRequestInterface, method: EHTTPMethod): Promise<any> {

    const { noSuccessMsg, successMsgTimeout, isOutside } = params;

    const headers = await this.getHeaders(params);
    const cleanParams = this.cleanParams(params);
    const data: FormData | object = params.formData
      ? params.formData
      : cleanParams;

    let searchParams = "";
    if (method === EHTTPMethod.GET) {
      // @ts-ignore
      searchParams = new URLSearchParams(data).toString();
    }

    return axios.request({
      method: method,
      headers: headers,
      url: url + (searchParams ? `?${searchParams}` : ""),
      data: data
    })
      .then(res => res.data)
      .catch(res => {
        if (isOutside) {
          console.error(res);
          return res;
        }

        return get(res, "response.data", { status: false, data: {} });
      })
      .then(res => {
        // @ts-ignore
        if (get(res, "status", false) && !noSuccessMsg) {
          // @ts-ignore
          createSuccessMgs(get(res, "msg", null), toNumber(successMsgTimeout || 3000));
        }

        return res;
      });
  }

  // Очищаем от ненужных данных параметры запроса
  private cleanParams(params: getRequestInterface): object {
    delete params["headers"];
    delete params["successMsgTimeout"];
    delete params["noSuccessMsg"];
    delete params["isOutside"];
    return params;
  }

  // Возвращает общие хедеры
  // @ts-ignore
  private getHeaders = async (params: getRequestInterface): object => {
    let headers = {};
    if (!params.isOutside) {
      headers = { "Accept": "application/json" };

      if (this.tokens.getAccess()) {
        headers["Authorization"] = `Bearer ${this.tokens.getAccess()}`;
      }

      headers["X-REQUEST-LOCALE"] = store.getState().userInfo.user.locale;

      const abTests = getAllABTests();
      if (Object.keys(abTests).length > 0) {
        headers["X-REQUEST-AB-TESTS"] = JSON.stringify(abTests);
      }
    }

    if (!params.isOutside && this.tokens.getAccess()) {
      headers["Authorization"] = `Bearer ${this.tokens.getAccess()}`;
    }

    // если есть заголовки в параметрах, то пробрасываем их
    for (const key in (params["headers"] || {})) {
      headers[key] = params["headers"][key];
    }

    // Это бот зашел на сайт?
    const isCrawlerVal = await isCrawler();
    if (isCrawlerVal) {
      headers["X-REQUEST-CRAWLER"] = isCrawlerVal;
    }

    return headers;
  };

  // Обрабатываем запрос и возвращаем его результат
  private async afterRequest(
    request: Promise<any>, // промис от axios
    url: string, // url, куда слать снова запрос
    params: object, // параметры, которые снова отправятся
    isRepeat: boolean = false, // было ли уже повторение запроса
    method: EHTTPMethod = EHTTPMethod.GET // каким методом отправлять данные (post/delete/patch/put)
    // @ts-ignore
  ): Promise<any> {
    request = request.then(res => {
      return new ChainCheckNeedRefreshTokenHTTP(token).check(res);
    });
    // По очереди проходимся по каждому обработчику
    this.chains.map(chain => request.then(chain.check.bind(chain)));

    return request.then(async responseData => {
      // если не повторяли запрос и надо повторить запрос
      if (!isRepeat && responseData && responseData.tryReqAgain) {
        // делаем повторный запрос после обновления токенов
        return await this.commonRequest(url, params, true, method);
      }

      // если не надо повторять запрос, то возвращает промис с всегда удачным результатом
      return responseData;
    });
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
    new ChainCheckErrorsHTTP(),
    new ChainCheckLocaleHTTP(),
    new ChainCheckAbTestsHTTP(),
    new ChainCheckUserDataHTTP(redirect),
    new ChainCheckVersionHTTP(),
    new ChainCheckRedirectHTTP(redirect)
  ]
);

export default r;