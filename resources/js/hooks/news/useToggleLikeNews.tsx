import { get } from "lodash";
import * as React from "react";
import { IShortNewsInterface } from "../../utils/interfaces/news";
import newsRep from "../../utils/repository/news";

const useToggleLikeNews = (onChangeLike?: (oneNews: IShortNewsInterface) => void, onErrorLike?: (id: number) => void): (id: number) => void => {
  // лайк на новости
  return (id: number): void => {
    newsRep.toggleLike(id).then(res => {
      const oneNews = get(res, "data.news", null) as IShortNewsInterface;
      if (!oneNews) {
        onErrorLike && onErrorLike(id);
        return;
      }

      onChangeLike(oneNews);
    });
  };
};

export default useToggleLikeNews;