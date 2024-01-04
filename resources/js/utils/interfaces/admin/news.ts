import { ELanguages } from "../../enums/user";
import { IInfoNews, IShortNewsInterface } from "../news";

export interface IImageUploadTypeEasyEditor {
  (image: File, onSuccess: (imageURL: string) => void, onError: (errorMessage: string) => void): void;
}

export interface IInfoAdminNewsData {
  newsInfo: IInfoNews;
  duplicates: IShortNewsInterface[];
  images: string[];
}

export interface IDataEdit {
  short_text?: string;
  text?: string;
  title?: string;
  image?: File;
  duplicates: IDataEditDuplicate[];
}

export interface IDataCreate {
  short_text: string;
  text: string;
  title: string;
  locale: ELanguages;
  image: File;
  duplicates?: IDataEditDuplicate[];
}

export interface IDataEditDuplicate {
  // @ts-ignore
  [k in ELanguages]: number;
}

export interface IDuplicateValues {
  // @ts-ignore
  [k in ELanguages]: string;
}

export interface IDraftInterface {
  short_text?: string;
  text?: string;
  title?: string;
  duplicates?: IShortNewsInterface[];
}
