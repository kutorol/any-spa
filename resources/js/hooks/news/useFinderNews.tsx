import { get } from "lodash";
import * as React from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { EHTTPCodes } from "../../utils/enums/http";
import { eventScrollUp } from "../../utils/funcs/event";
import { createSearchUrlWithPage, getPageFromUrl, navTo, navToBackOrDefaultURL } from "../../utils/funcs/url";
import { IInfoNewsData, INewsList } from "../../utils/interfaces/news";
import newsRep from "../../utils/repository/news";

interface IUseFinderNews {
  onFound?: (data: INewsList) => void;
  onErrorFind?: (page: number) => void;
  // pageUrl - url для которого будет создаваться ссылка на текущую страницу с page параметром
  pageUrl?: string;
  setCurrentPage?: (page: number) => void;
  existsPage?: (page: number) => boolean;
  onFoundInfo?: (data: IInfoNewsData) => void;
  backToUrl?: string;
  finderPromise?: (page: number) => Promise<any>;
}

interface IUseFinderNewsResponse {
  getPageNewsList: (page: number) => Promise<boolean>;
  findInfoNews: (id: number, afterRequest: () => void) => void;
  backTo: () => void;
}

const useFinderNews = ({
                         pageUrl = "/news",
                         setCurrentPage,
                         existsPage,
                         onFound,
                         onErrorFind,
                         onFoundInfo,
                         backToUrl = "/news",
                         finderPromise
                       }: IUseFinderNews): IUseFinderNewsResponse => {
  const loc = useLocation();
  const nav = useNavigate();
  const params = useParams();
  const backTo = () => navToBackOrDefaultURL(backToUrl);

  // находит листинг новостей
  const getPageNewsList = (page: number): Promise<boolean> => {
    if (existsPage(page)) {
      // @ts-ignore
      return new Promise<boolean>((resolve) => {
        eventScrollUp(50);
        return resolve(true);
      });
    }

    return finderPromise(page).then(res => {
      if (!get(res, "data.news", null)) {
        onErrorFind(page);
        return false;
      }

      const info = res.data as INewsList;
      onFound(info);

      if (getPageFromUrl(undefined, loc) !== info.page) {
        setCurrentPage(info.page);
        navTo(`/${pageUrl}${createSearchUrlWithPage(info.page, loc)}`);
      }

      eventScrollUp(50);
      return true;
    });
  };

  // находит конкретную новость
  const findInfoNews = (id: number, afterRequest: () => void) => {
    newsRep.getInfo(id).then(res => {
      afterRequest();

      const newsInfo = get(res, "data.newsInfo", null);
      if (!newsInfo) {
        get(res, "statusCode", 0) === EHTTPCodes.NOT_FOUND && backTo();
        eventScrollUp();
        return;
      }

      onFoundInfo && onFoundInfo(res.data as IInfoNewsData);

      if ((params.slug || "").trim() === "") {
        nav(`/${res.data.newsInfo.locale}/news/${res.data.newsInfo.id}/${res.data.newsInfo.slug}`);
      }
      eventScrollUp();
    });
  };

  return {
    getPageNewsList: getPageNewsList,
    findInfoNews: findInfoNews,
    backTo: backTo
  };
};

export default useFinderNews;