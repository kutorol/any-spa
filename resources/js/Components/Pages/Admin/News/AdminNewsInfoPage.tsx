import { Grid } from "@mui/material";
import "easymde/dist/easymde.min.css";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get, toNumber } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import useDeleteDialogConfirm from "../../../../hooks/dialog/useDeleteDialogConfirm";
import useDialogConfirm from "../../../../hooks/dialog/useDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { createInfoMgs } from "../../../../store/reducers/func/snackbar/info-snackbar";
import { createSuccessMgs } from "../../../../store/reducers/func/snackbar/ok-snackbar";
import { createWarningMgs } from "../../../../store/reducers/func/snackbar/warning-snackbar";
import { EHTTPCodes } from "../../../../utils/enums/http";
import { ELanguages } from "../../../../utils/enums/user";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { getLocaleName } from "../../../../utils/funcs/locale";
import { capitalize } from "../../../../utils/funcs/str";
import { navTo, navToBackOrDefaultURL } from "../../../../utils/funcs/url";
import {
  IDataEdit,
  IDataEditDuplicate,
  IDraftInterface,
  IDuplicateValues,
  IImageUploadTypeEasyEditor,
  IInfoAdminNewsData
} from "../../../../utils/interfaces/admin/news";
import { IInfoNews, IShortNewsInterface } from "../../../../utils/interfaces/news";
import newsRep from "../../../../utils/repository/admin/news";
import BackBtn from "../../../Common/Gui/Btn/BackBtn";
import ImageFullScreen from "../../../Common/Gui/Img/ImageFullScreen";
import MainCard from "../../../Common/MainCard/MainCard";
import DuplicateNewsBlock from "./Components/DuplicateNewsBlock";
import ImagesList from "./Components/ImagesList";
import LikeAndViewBlock from "./Components/LikeAndViewBlock";
import MainHeader from "./Components/MainHeader";
import MainImageBlock from "./Components/MainImageBlock";
import MainText from "./Components/MainText";
import PublishBtn from "./Components/PublishBtn";
import ShortText from "./Components/ShortText";
import TitleBlock from "./Components/TitleBlock";


const removeImageFromText = (text: string, imageSrc: string): string => {
  const markdownPattern = `\\[.*\\]\\(${imageSrc}\\)`;
  const patterns = [
    `!${markdownPattern}`,
    markdownPattern,
    `<img\\s+src=("|\\')${imageSrc}("|\\')\\s*>`
  ];

  patterns.map((p: string) => {
    // Паттерн для поиска markdown разметки с изображением
    const pattern = new RegExp(p, "g");
    text = text.replace(pattern, "");
  });

  return text;
};


const draftName = "draft-edit-news-";
const getDraftKey = (id: number): string => `${draftName}${id}`;
const getDraftSave = (id: number): string => {
  return localStorage.getItem(getDraftKey(id)) || "";
};

const getDraftObject = (id: number): IDraftInterface => {
  let draftStr = getDraftSave(id);
  if (draftStr.trim() !== "") {
    return JSON.parse(draftStr);
  }

  return {};
};

const setDraftSave = (id: number, key: string, val: any): void => {
  const draftJSON = getDraftObject(id);
  draftJSON[key] = val;
  localStorage.setItem(getDraftKey(id), JSON.stringify(draftJSON));
};

const clearDraftSave = (id: number): void => {
  localStorage.removeItem(getDraftKey(id));
};

const checkOnEqualDraft = (newsInfo: IInfoNews, duplicates: IShortNewsInterface[]): boolean => {
  const draftObject = getDraftObject(newsInfo.id);
  if (draftObject.text && draftObject.text === newsInfo.text) {
    delete draftObject["text"];
  }

  if (draftObject.title && draftObject.title === newsInfo.title) {
    delete draftObject["title"];
  }

  if (draftObject.short_text && draftObject.short_text === newsInfo.short_text) {
    delete draftObject["short_text"];
  }

  const draftDuplicates = {};
  (draftObject.duplicates || []).map((d: IShortNewsInterface) => {
    draftDuplicates[d.locale] = d.id;
  });

  const copyDuplicates = {};
  duplicates.map((d: IShortNewsInterface) => {
    copyDuplicates[d.locale] = d.id;
  });

  const locales = Object.keys(draftDuplicates);
  for (let i = 0; i < locales.length; i++) {
    const l = locales[i];
    if (draftDuplicates[l] === toNumber(copyDuplicates[l])) {
      delete draftDuplicates[l];
      delete copyDuplicates[l];
    }
  }

  if (Object.keys(draftDuplicates).length === 0 && Object.keys(copyDuplicates).length === 0) {
    delete draftObject["duplicates"];
  }

  const leftDraftKeys = Object.keys(draftObject);
  leftDraftKeys.map((k: string) => {
    setDraftSave(newsInfo.id, k, draftObject[k]);
  });

  if (leftDraftKeys.length === 0) {
    clearDraftSave(newsInfo.id);
    return true;
  }

  return false;
};

const defaultBackToURL = "/admin/news/list";

const AdminNewsInfoPage = () => {
  const { t } = useLaravelReactI18n();
  const params = useParams();
  const loc = useLocation();

  const [info, setInfo] = useState<IInfoAdminNewsData | null>(null);
  const [shortTextValue, setShortTextValue] = useState<string>("");
  const [textValue, setTextValue] = useState<string>("");
  const [backdropImageSrc, setBackdropImageSrc] = useState<null | string>(null);
  const [mainImage, setMainImage] = useState<null | string | File>(null);
  const [draftExists, setDraftExists] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  // нужна для изменения инпута дублирующих статей
  const [duplicateValues, setDuplicateValues] = useState<IDuplicateValues>({});
  // дублирующие статьи, чтобы сделать проверку на "изменили статью"
  const [duplicates, setDuplicates] = useState<IShortNewsInterface[]>([]);

  const backTo = () => navToBackOrDefaultURL(defaultBackToURL);

  // @ts-ignore
  const usedImages = get(info, "images", []).filter((src: string): boolean => textValue.includes(src));
  const unUsedImages = get(info, "images", []).filter((src: string): boolean => usedImages.indexOf(src) === -1);

  const onOpenNewsFromOtherLanguage = (l: ELanguages): Promise<boolean> => {
    newsRep.clearUnUsedImages(info.newsInfo.id);
    // @ts-ignore
    const d = info.duplicates.find((d: IShortNewsInterface) => d.locale === l);
    if (!d) {
      createWarningMgs(t("Дублирующей статьи на выбранном языке еще не существуют (:lang)", {
        lang: l.toString().toUpperCase()
      }));

      // @ts-ignore
      return new Promise<boolean>(r => r(false));
    }
    navTo(`/admin/news/${d.id}`);
    // @ts-ignore
    return new Promise<boolean>(r => r(true));
  };

  const { openConfirmDialog, confirmDialogTSX } = useDialogConfirm(
    onOpenNewsFromOtherLanguage,
    t("перейти на другую новость"),
    t("Все ваши изменения будут утеряны")
  );

  // находит конкретную новость
  const findInfoNews = (id: number): Promise<boolean> => {
    info !== null && changeFullScreenLoaderState(true);
    return newsRep.getInfo(id).then(res => {
      info !== null && changeFullScreenLoaderState(false);

      const newsInfo = get(res, "data.newsInfo", null);
      if (!newsInfo) {
        get(res, "statusCode", 0) === EHTTPCodes.NOT_FOUND && backTo();
        eventScrollUp();
        return false;
      }

      setInitState(res.data as IInfoAdminNewsData);
      return true;
    });
  };

  const setInitState = (data: IInfoAdminNewsData): void => {
    const values = {};
    // @ts-ignore
    Object.values(ELanguages).map((l: ELanguages, i: number) => {
      // @ts-ignore
      const newsDuplicate = data.duplicates.find((d: IShortNewsInterface) => d.locale === l);
      values[l] = newsDuplicate ? newsDuplicate.id.toString() : "";
    });

    setDraftExists(!checkOnEqualDraft(data.newsInfo, data.duplicates));
    setDuplicateValues(values);
    setDuplicates(data.duplicates);
    setTitle(data.newsInfo.title);
    setShortTextValue(data.newsInfo.short_text);
    setTextValue(data.newsInfo.text);
    setMainImage(data.newsInfo.image);
    setInfo(data);
    eventScrollUp();
  };

  useEffect(() => {
    const id = toNumber(params.id);
    if (!id) {
      createWarningMgs(t("Новость не найдена"));
      navTo(defaultBackToURL);
      return;
    }

    findInfoNews(id);

    return () => {
      info && newsRep.clearUnUsedImages(info.newsInfo.id);
    };
  }, [loc.pathname]);

  const loadUsedImages = () => {
    newsRep.getUploadedNewsImages(info.newsInfo.id).then(res => {
      if (!res.status) {
        return;
      }

      setInfo({
        ...info,
        images: res.data.images as string[]
      });
    });
  };

  const isDisableBtn = (): boolean => {
    return title.trim() === ""
      || textValue.trim() === ""
      || shortTextValue.trim() === "";
  };

  // нужно ли подтверждение перед публикацией
  const needConfirmBeforeChangeURL = (): boolean => {
    let needConfirm = false;
    if (typeof mainImage === "object") {
      needConfirm = true;
    }

    if (info.newsInfo.title !== title) {
      needConfirm = true;
    }

    if (info.newsInfo.text !== textValue) {
      needConfirm = true;
    }

    if (info.newsInfo.short_text !== shortTextValue) {
      needConfirm = true;
    }

    // @ts-ignore
    Object.values(ELanguages).map((l: ELanguages) => {
      if (l === info.newsInfo.locale) {
        return;
      }

      const val = duplicateValues[l];
      // @ts-ignore
      const newsDuplicate = info.duplicates.find((d: IShortNewsInterface) => d.locale === l);

      if (typeof newsDuplicate === "undefined" && typeof val === "undefined" || (!newsDuplicate && !val)) {
        return;
      }

      if ((newsDuplicate && !val) || (!newsDuplicate && typeof val === "string") || (newsDuplicate && newsDuplicate.id.toString() !== val)) {
        needConfirm = true;
      }
    });

    return needConfirm;
  };

  const onChangeLang = (l: ELanguages): void => {
    if (needConfirmBeforeChangeURL()) {
      openConfirmDialog(l);
      return;
    }

    onOpenNewsFromOtherLanguage(l);
  };

  // при загрузке картинки в редактор основного текста
  const imageUpload: IImageUploadTypeEasyEditor = (f: File, onSuccess, onError) => {
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    // @ts-ignore
    if (!validImageTypes.includes(f.type)) {
      createWarningMgs(t("Загрузить можно только картинку jpg, jpeg или png формата"), 2000);
      return;
    }

    if ((f.size / 1024 / 1024) >= 10) {
      createWarningMgs(t("Размер картинки не должен превышать 10Mb"), 2000);
      return;
    }

    newsRep.uploadImage(info.newsInfo.id, f).then(res => {
      if (!res.status) {
        return;
      }

      onSuccess(res.data.image_url);

      setInfo({
        ...info,
        images: [
          ...info.images,
          res.data.image_url
        ]
      });

      loadUsedImages();
    });
  };

  const onPublish = (e: React.SyntheticEvent): Promise<boolean> => {
    e && e.preventDefault();

    if (!needConfirmBeforeChangeURL()) {
      createInfoMgs(t("Вы не внесли изменений"));
      unUsedImages.length > 0 && newsRep.clearUnUsedImages(info.newsInfo.id);
      return;
    }

    const data = {} as IDataEdit;
    if (info.newsInfo.short_text !== shortTextValue) {
      data.short_text = shortTextValue;
    }

    if (info.newsInfo.text !== textValue) {
      data.text = textValue;
    }

    if (typeof mainImage === "object") {
      data.image = mainImage;
    }

    duplicates.map((d: IShortNewsInterface) => {
      if (!data.duplicates) {
        // @ts-ignore
        data.duplicates = {} as IDataEditDuplicate;
      }

      data.duplicates[d.locale] = d.id;
    });

    return newsRep.edit(info.newsInfo.id, data).then(async (res: any) => {
      if (!res.status) {
        return false;
      }

      newsRep.clearUnUsedImages(info.newsInfo.id);

      clearDraftSave(info.newsInfo.id);
      const response = await findInfoNews(info.newsInfo.id);
      return response;
    });
  };

  const { openConfirmDialog: openConfirmDialogPublish, confirmDialogTSX: confirmDialogTSXPublish } = useDialogConfirm(
    onPublish,
    t("опубликовать изменения")
  );

  const {
    openDeleteDialog: openDeleteNewsDialog,
    deleteDialogTSX: deleteNewsDialogTSX
  } = useDeleteDialogConfirm((): Promise<boolean> => {
    return newsRep.delete(info.newsInfo.id).then((res: boolean) => {
      if (!res) {
        return false;
      }

      navTo(defaultBackToURL);

      return res;
    });
  }, t("новость"));

  const { openDeleteDialog, deleteDialogTSX } = useDeleteDialogConfirm((src: string): Promise<boolean> => {
    return newsRep.deleteImage(src).then((res: boolean) => {
      if (!res) {
        return false;
      }

      const text = removeImageFromText(textValue, src);
      setDraftSave(info.newsInfo.id, "text", text);
      checkOnEqualDraft(info.newsInfo, info.duplicates);
      setTextValue(text);

      setInfo({
        ...info,
        images: [...info.images.filter((srcImage: string) => srcImage !== src)]
      });

      return res;
    });
  }, t("картинку"));

  // устанавливает сохраненную копию
  const onClickSetDraft = (): void => {
    const draft = getDraftObject(info.newsInfo.id);

    if (typeof draft.title !== "undefined") {
      setTitle(draft.title);
    }

    if (typeof draft.short_text !== "undefined") {
      setShortTextValue(draft.short_text);
    }

    if (typeof draft.text !== "undefined") {
      setTextValue(draft.text);
    }

    if (draft.duplicates) {
      const values = {};
      // @ts-ignore
      Object.values(ELanguages).map((l: ELanguages, i: number) => {
        // @ts-ignore
        const newsDuplicate = draft.duplicates.find((d: IShortNewsInterface) => d.locale === l);
        values[l] = newsDuplicate ? newsDuplicate.id.toString() : "";
      });

      setDuplicates([...draft.duplicates]);
      setDuplicateValues(values);
    }

    setDraftExists(false);
    createSuccessMgs(t("Сохраненная версия установлена"), 1000);
  };

  const onChangeTitle = (e: React.SyntheticEvent): void => {
    // @ts-ignore
    const value: string = capitalize(e.target.value || "");
    setTitle(value);
    setDraftSave(info.newsInfo.id, "title", value);
  };

  const onChangeMainText = (text: string): void => {
    setTextValue(text);
    setDraftSave(info.newsInfo.id, "text", text);
    checkOnEqualDraft(info.newsInfo, info.duplicates);
  };

  const onChangeShortText = (text: string): void => {
    setShortTextValue(text);
    setDraftSave(info.newsInfo.id, "short_text", text);
    checkOnEqualDraft(info.newsInfo, info.duplicates);
  };

  const onFindDuplicate = (currentID: null | number, newID: number, l: ELanguages): void => {
    if ((!currentID && !newID) || currentID === newID) {
      return;
    }

    if (!newID) {
      setDuplicateValues({
        ...duplicateValues,
        [l]: ""
      });
      const newDuplicates = [...duplicates.filter((d: IShortNewsInterface) => d.locale !== l)];
      setDuplicates(newDuplicates);
      setDraftSave(info.newsInfo.id, "duplicates", newDuplicates);
      checkOnEqualDraft(info.newsInfo, info.duplicates);
      return;
    }

    // @ts-ignore
    const sameNews = duplicates.find((dup: IShortNewsInterface) => dup.id === newID && dup.locale !== l);
    if (sameNews) {
      createWarningMgs(t("ID (:id) уже добавлено к новости на :lang языке", {
        id: newID,
        lang: sameNews.locale.toString().toUpperCase()
      }));

      setDuplicateValues({
        ...duplicateValues,
        [l]: ""
      });
      return;
    }

    changeFullScreenLoaderState(true);
    newsRep.findDuplicate(newID, l).then(res => {
      changeFullScreenLoaderState(false);
      if (!res.status) {
        // @ts-ignore
        const d = duplicates.find((dup: IShortNewsInterface) => dup.locale === l);
        return setDuplicateValues({
          ...duplicateValues,
          [l]: d ? d.id.toString() : ""
        });
      }

      const newDuplicates = [
        ...duplicates.filter((dup: IShortNewsInterface) => dup.locale !== l),
        res.data.duplicate as IShortNewsInterface
      ];

      setDraftSave(info.newsInfo.id, "duplicates", newDuplicates);
      checkOnEqualDraft(info.newsInfo, info.duplicates);
      setDuplicates(newDuplicates);
    });
  };

  // если еще не сделали первый запрос на сервер
  if (!info) {
    return null;
  }

  // @ts-ignore
  const variantsDuplicateNews: IDuplicateValues = {
    [info.newsInfo.locale]: getLocaleName(info.newsInfo.locale)
  };

  for (let i = 0; i < duplicates.length; i++) {
    const l = duplicates[i].locale;
    if (info.newsInfo.locale === l) {
      continue;
    }
    variantsDuplicateNews[l] = getLocaleName(l);
  }

  return (
    <>
      {deleteDialogTSX}
      {deleteNewsDialogTSX}
      {confirmDialogTSX}
      {confirmDialogTSXPublish}

      <ImageFullScreen
        url={backdropImageSrc}
        setBackdropImageUrl={setBackdropImageSrc}
      />

      <BackBtn defaultBackUrl={defaultBackToURL}/>

      <MainCard
        headerSX={{ py: 0.5 }}
        title={
          <MainHeader
            newsTitle={title}
            newsID={info.newsInfo.id}
            newsLocale={info.newsInfo.locale}
            variants={variantsDuplicateNews}
            draftExists={draftExists}
            onClickSetDraft={onClickSetDraft}
            onChangeLang={onChangeLang}
          />
        }
      >
        <Grid container>
          <LikeAndViewBlock
            likes={info.newsInfo.likes}
            views={info.newsInfo.views}
          />

          <TitleBlock
            newsTitle={title}
            setNewsTitle={onChangeTitle}
          />

          <MainImageBlock
            mainImage={mainImage}
            onChangeMainImage={setMainImage}
            setBackdropImageSrc={setBackdropImageSrc}
          />

          <ShortText
            text={shortTextValue}
            onChange={onChangeShortText}
          />

          <MainText
            text={textValue}
            onChange={onChangeMainText}
            imageUpload={imageUpload}
          />

          <ImagesList
            usedImages={usedImages}
            unUsedImages={unUsedImages}
            onDelete={openDeleteDialog}
            setBackdropImageSrc={setBackdropImageSrc}
          />

          <DuplicateNewsBlock
            currentLocale={info.newsInfo.locale}
            duplicateValues={duplicateValues}
            setDuplicateValues={setDuplicateValues}
            duplicates={duplicates}
            onFindDuplicate={onFindDuplicate}
          />

          <PublishBtn
            onPublish={openConfirmDialogPublish}
            disabled={isDisableBtn() || !needConfirmBeforeChangeURL()}
            onDelete={openDeleteNewsDialog}
          />
        </Grid>
      </MainCard>
    </>
  );
};

export default AdminNewsInfoPage;