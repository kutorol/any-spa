import { useLaravelReactI18n } from "laravel-react-i18n";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import useFinderNews from "../../../hooks/news/useFinderNews";
import useToggleLikeNews from "../../../hooks/news/useToggleLikeNews";
import { changeFullScreenLoaderState } from "../../../store/reducers/func/common/full-screen-loader";
import { changeSeo, ISeoDuplicatesRel } from "../../../store/reducers/func/common/seo";
import { createWarningMgs } from "../../../store/reducers/func/snackbar/warning-snackbar";
import { RootState } from "../../../store/store";
import { ELanguages } from "../../../utils/enums/user";
import { IInfoNewsData, IShortNewsInterface } from "../../../utils/interfaces/news";

import NewsInfo from "./NewsInfo";
import SkeletonNewsInfo from "./SkeletonNewsInfo";

const NewsInfoPage = () => {
  const params = useParams();
  const [info, setInfo] = useState<IInfoNewsData | null>(null);
  const { t } = useLaravelReactI18n();
  const loc = useLocation();
  const user = useSelector((s: RootState) => s.userInfo.user);

  const onToggleLike = useToggleLikeNews((oneNews: IShortNewsInterface): void => {
    // оценили новость в "другие новости"
    if (oneNews.id !== info.newsInfo.id) {
      setInfo({
        ...info,
        otherNews: [
          ...info.otherNews.map((n) => {
            if (n.id !== oneNews.id) {
              return n;
            }

            n.is_liked = oneNews.is_liked;
            n.likes = oneNews.likes;
            return n;
          })
        ]
      });

      return;
    }

    const newLikes = info.likes.filter(u => u.user_id !== user.uid);
    if (oneNews.is_liked) {
      newLikes.unshift({
        user_id: user.uid,
        avatar: user.avatar,
        name: user.first_name
      });
    }

    setInfo({
      ...info,
      newsInfo: {
        ...info.newsInfo,
        likes: oneNews.likes,
        is_liked: oneNews.is_liked
      },
      likes: [...newLikes]
    });
  });

  const { findInfoNews, backTo } = useFinderNews({
    onFoundInfo: ((data: IInfoNewsData) => {
      const duplicates: ISeoDuplicatesRel[] = data.duplicates.map(d => {
        return {
          locale: d.locale as ELanguages,
          link: `/${d.locale}/news/${d.id}/${d.slug}`
        } as ISeoDuplicatesRel;
      });

      setInfo(data);

      changeSeo(loc.pathname, {
        title: data.newsInfo.title,
        h1: data.newsInfo.title,
        desc: data.newsInfo.short_text,
        image: data.newsInfo.image
      }, duplicates);
    })
  });

  useEffect(() => {
    const id = toNumber(params.id);
    if (!id) {
      createWarningMgs(t("Новость не найдена"));
      backTo();
      return;
    }

    info !== null && changeFullScreenLoaderState(true);
    findInfoNews(id, (): void => {
      info !== null && changeFullScreenLoaderState(false);
    });
  }, [loc.pathname]);

  if (info === null) {
    return (
      <SkeletonNewsInfo/>
    );
  }

  const otherNews = get(info, "otherNews", []);

  return (
    <NewsInfo
      backTo={backTo}
      newsInfo={info.newsInfo}
      onToggleLike={onToggleLike}
      totalLikes={info.newsInfo.likes}
      likes={info.likes}
      otherNews={otherNews}
    />
  );
};

export default NewsInfoPage;