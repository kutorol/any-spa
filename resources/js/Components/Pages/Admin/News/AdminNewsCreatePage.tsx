import { Grid } from "@mui/material";
import "easymde/dist/easymde.min.css";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { get } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import useDeleteDialogConfirm from "../../../../hooks/dialog/useDeleteDialogConfirm";
import useDialogConfirm from "../../../../hooks/dialog/useDialogConfirm";
import { changeFullScreenLoaderState } from "../../../../store/reducers/func/common/full-screen-loader";
import { createInfoMgs } from "../../../../store/reducers/func/snackbar/info-snackbar";
import { createWarningMgs } from "../../../../store/reducers/func/snackbar/warning-snackbar";
import { RootState } from "../../../../store/store";
import { ELanguages } from "../../../../utils/enums/user";
import { eventScrollUp } from "../../../../utils/funcs/event";
import { getLocaleName } from "../../../../utils/funcs/locale";
import { capitalize } from "../../../../utils/funcs/str";
import { navTo } from "../../../../utils/funcs/url";
import {
  IDataCreate,
  IDataEditDuplicate,
  IDraftInterface,
  IDuplicateValues,
  IImageUploadTypeEasyEditor,
  IInfoAdminNewsData
} from "../../../../utils/interfaces/admin/news";
import { IShortNewsInterface } from "../../../../utils/interfaces/news";

import newsRep from "../../../../utils/repository/admin/news";
import BackBtn from "../../../Common/Gui/Btn/BackBtn";
import Icon from "../../../Common/Gui/Common/Icon";
import ImageFullScreen from "../../../Common/Gui/Img/ImageFullScreen";
import MainCard from "../../../Common/MainCard/MainCard";
import DuplicateNewsBlock from "./Components/DuplicateNewsBlock";
import ImagesList from "./Components/ImagesList";
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


const draftName = "draft-create-news";
const getDraftSave = (): string => {
  return localStorage.getItem(draftName) || "";
};

const getDraftObject = (): IDraftInterface => {
  let draftStr = getDraftSave();
  if (draftStr.trim() !== "") {
    return JSON.parse(draftStr);
  }

  return {};
};

const setDraftSave = (key: string, val: any): void => {
  const draftJSON = getDraftObject();
  draftJSON[key] = val;
  localStorage.setItem(draftName, JSON.stringify(draftJSON));
};

const clearDraftSave = (): void => {
  localStorage.removeItem(draftName);
};

const checkOnEqualDraft = (): boolean => {
  const draftObject = getDraftObject();
  if ((draftObject.title || "").trim() === "") {
    delete draftObject["title"];
  }

  if ((draftObject.text || "").trim() === "") {
    delete draftObject["text"];
  }

  if ((draftObject.short_text || "").trim() === "") {
    delete draftObject["short_text"];
  }

  if ((draftObject.duplicates || []).length === 0) {
    delete draftObject["duplicates"];
  }

  const leftDraftKeys = Object.keys(draftObject);
  leftDraftKeys.map((k: string) => {
    setDraftSave(k, draftObject[k]);
  });

  if (leftDraftKeys.length === 0) {
    clearDraftSave();
    return true;
  }

  return false;
};

const defaultBackToURL = "/admin/news/list";

const AdminNewsCreatePage = () => {
  const { t } = useLaravelReactI18n();
  const loc = useLocation();

  const draftInfo = getDraftObject();
  const currentLocale: ELanguages = useSelector((s: RootState) => s.userInfo.user.locale);

  const [info, setInfo] = useState<IInfoAdminNewsData>({
    newsInfo: {
      slug: "",
      image: "",
      is_liked: false,
      created_at: "",
      updated_at: "",
      title: "",
      text: "",
      short_text: "",
      id: 0,
      likes: 0,
      views: 0,
      locale: currentLocale
    },
    images: [],
    duplicates: []
  });

  const [shortTextValue, setShortTextValue] = useState<string>(draftInfo.short_text || "");
  const [textValue, setTextValue] = useState<string>(draftInfo.text || "");
  const [backdropImageSrc, setBackdropImageSrc] = useState<null | string>(null);
  const [mainImage, setMainImage] = useState<null | string | File>(null);
  const [title, setTitle] = useState<string>(draftInfo.title || "");
  const [newsLocale, setNewsLocale] = useState<ELanguages>(currentLocale);

  const getInitDuplicateValues = () => {
    // заменить на драфт
    const values = {};
    // @ts-ignore
    Object.values(ELanguages).map((l: ELanguages) => {
      // @ts-ignore
      const newsDuplicate = (draftInfo.duplicates || []).find((d: IShortNewsInterface) => d.locale === l);
      values[l] = newsDuplicate ? newsDuplicate.id.toString() : "";
    });

    return values;
  };

  // нужна для изменения инпута дублирующих статей
  const [duplicateValues, setDuplicateValues] = useState<IDuplicateValues>(getInitDuplicateValues());
  // дублирующие статьи, чтобы сделать проверку на "изменили статью"
  const [duplicates, setDuplicates] = useState<IShortNewsInterface[]>(draftInfo.duplicates || []);

  // @ts-ignore
  const usedImages = get(info, "images", []).filter((src: string): boolean => textValue.includes(src));
  const unUsedImages = get(info, "images", []).filter((src: string): boolean => usedImages.indexOf(src) === -1);

  const loadUsedImages = () => {
    newsRep.getUploadedNewsImages(0).then(res => {
      if (!res.status) {
        return;
      }

      setInfo({
        ...info,
        images: res.data.images as string[]
      });
    });
  };

  useEffect(() => {
    eventScrollUp();
    loadUsedImages();

    return () => {
      info && newsRep.clearUnUsedImages(0);
    };
  }, [loc.pathname]);

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

    newsRep.uploadImage(0, f).then(res => {
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

  const needConfirmBeforeChangeURL = (): boolean => {
    return textValue.trim() !== ""
      && shortTextValue.trim() !== ""
      && mainImage !== null
      && title.trim() !== "";
  };

  const onPublish = (e: React.SyntheticEvent): Promise<boolean> => {
    e && e.preventDefault();

    if (!needConfirmBeforeChangeURL()) {
      createInfoMgs(t("Вы не внесли изменений"));
      unUsedImages.length > 0 && newsRep.clearUnUsedImages(0);
      return;
    }

    const data = {
      short_text: shortTextValue,
      text: textValue,
      image: mainImage,
      locale: newsLocale,
      title: title,
      duplicates: {} as IDataEditDuplicate
    } as IDataCreate;

    duplicates.map((d: IShortNewsInterface) => {
      if (d.locale === newsLocale) {
        return;
      }

      data.duplicates[d.locale] = d.id;
    });

    return newsRep.create(data).then((res: any) => {
      if (!res.status) {
        return false;
      }

      clearDraftSave();
      navTo(`/admin/news/${res.data.id}`);
      return true;
    });
  };

  const { openConfirmDialog: openConfirmDialogPublish, confirmDialogTSX: confirmDialogTSXPublish } = useDialogConfirm(
    onPublish,
    t("опубликовать изменения")
  );

  const { openDeleteDialog, deleteDialogTSX } = useDeleteDialogConfirm((src: string): Promise<boolean> => {
    return newsRep.deleteImage(src).then((res: boolean) => {
      if (!res) {
        return false;
      }

      const text = removeImageFromText(textValue, src);
      setDraftSave("text", text);
      checkOnEqualDraft();
      setTextValue(text);

      setInfo({
        ...info,
        images: [...info.images.filter((srcImage: string) => srcImage !== src)]
      });

      return res;
    });
  }, t("картинку"));

  const onChangeMainText = (text: string): void => {
    setTextValue(text);
    setDraftSave("text", text);
    checkOnEqualDraft();
  };

  const onChangeShortText = (text: string): void => {
    setShortTextValue(text);
    setDraftSave("short_text", text);
    checkOnEqualDraft();
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
      setDraftSave("duplicates", newDuplicates);
      checkOnEqualDraft();
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

      setDraftSave("duplicates", newDuplicates);
      checkOnEqualDraft();
      setDuplicates(newDuplicates);
    });
  };

  const onChangeTitle = (e: React.SyntheticEvent): void => {
    // @ts-ignore
    const value: string = capitalize(e.target.value || "");
    setTitle(value);
    setDraftSave("title", value);
  };

  const variants: IDuplicateValues = {};
  // @ts-ignore
  Object.values(ELanguages).map((l: ELanguages) => {
    variants[l] = getLocaleName(l);
  });

  return (
    <>
      {deleteDialogTSX}
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
            newsLocale={newsLocale}
            variants={variants}
            titleSelect={t("Язык новости")}
            onChangeLang={setNewsLocale}
          />
        }
      >
        <Grid container>
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
            currentLocale={newsLocale}
            duplicateValues={duplicateValues}
            setDuplicateValues={setDuplicateValues}
            duplicates={duplicates}
            onFindDuplicate={onFindDuplicate}
          />

          <PublishBtn
            title={t("Создать новость")}
            icon={<Icon tablerIcon="IconSend"/>}
            onPublish={openConfirmDialogPublish}
            disabled={!needConfirmBeforeChangeURL()}
          />
        </Grid>
      </MainCard>
    </>
  );
};

export default AdminNewsCreatePage;