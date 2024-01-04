// Крошки от "новостей"
import { ISeoFields } from "../../../../store/reducers/func/common/seo";
import store, { RootState } from "../../../../store/store";
import { getLastPage, getPageFromUrl } from "../../../../utils/funcs/url";
import { IBreadcrumbsUrl, IResponseFuncBreadcrumbs } from "../../../../utils/interfaces/breadcrumbs";

const newsUrls: IBreadcrumbsUrl = {
  // все новости
  "news": [
    { title: "Новости сайта", icon: "IconPilcrow", url: "/news" },
    {
      title: (loc: any): IResponseFuncBreadcrumbs => {
        return {
          title: "Страница :num",
          titleLangParams: {
            num: getPageFromUrl(undefined, loc)
          }
        };
      },
      icon: "IconListNumbers"
    }
  ],
  // конкретная новость
  "news\/\\d+(\/.*)?": [
    { title: "Новости сайта", icon: "IconPilcrow", url: "/news" },
    {
      breadcrumbs: (loc: object, params: object): null | IResponseFuncBreadcrumbs[] => {
        const lastPage = getLastPage();
        const page = getPageFromUrl(undefined, {
          search: lastPage.split("?")[1] || ""
        });

        const s = store.getState() as RootState;
        const seo = s.seo as ISeoFields;
        const lastPageObj: IResponseFuncBreadcrumbs = {
          icon: "IconNotes",
          title: seo.h1 || seo.title
        };
        if (page < 2) {
          return [lastPageObj];
        }

        return [
          {
            icon: "IconListNumbers",
            title: "Страница :num",
            titleLangParams: {
              num: page
            },
            url: `/news?page=${page}`
          } as IResponseFuncBreadcrumbs,
          lastPageObj
        ];
      }
    }
  ]
};

export default newsUrls;