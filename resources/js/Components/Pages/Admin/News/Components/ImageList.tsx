import List from "@mui/material/List";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import useCopyAction from "../../../../../hooks/useCopyAction";
import Image from "./Image";

interface IImageList {
  imagesSrc: string[];
  onDelete?: (src: string) => void;
  setBackdropImageSrc?: (src: string | null) => void;
}

const ImageList = ({ imagesSrc, onDelete, setBackdropImageSrc }: IImageList) => {
  const { t } = useLaravelReactI18n();
  const copyFunc = useCopyAction(t("Ссылка на картинку скопирована"), t("Не удалось скопировать ссылку на картинку"));

  const images = imagesSrc.map((src: string, i: number) => {
    const needDivider = i + 1 !== imagesSrc.length;

    return (
      <Image
        key={i}
        src={src}
        divider={needDivider}
        onDelete={onDelete}
        setBackdropImageSrc={setBackdropImageSrc}
        onCopy={copyFunc}
      />
    );
  });

  return (
    <List>{images}</List>
  );
};

export default ImageList;