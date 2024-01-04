import { ELanguages } from "../enums/user";

export interface INewsList {
  news: IShortNewsInterface[];
  page: number;
  totalPages: number;
}

export interface IInfoNews extends IShortNewsInterface {
  text: string;
}

export interface IInfoNewsLikes {
  avatar?: string;
  name: string;
  user_id: number;
}

export interface IInfoNewsData {
  newsInfo: IInfoNews;
  likes: IInfoNewsLikes[];
  duplicates: IShortNewsInterface[];
  otherNews: IShortNewsInterface[];
}

// Новость в листинге
export interface IShortNewsInterface {
  id: number;
  slug: string;
  title: string;
  short_text: string;
  image: string;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  likes: number;
  views: number;
  locale: ELanguages;
}