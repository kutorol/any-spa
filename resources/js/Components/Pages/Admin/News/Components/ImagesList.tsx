import * as React from "react";
import UnusedImagesBlock from "./UnusedImagesBlock";
import UsedImagesBlock from "./UsedImagesBlock";

interface IImagesList {
  usedImages: string[];
  unUsedImages: string[];
  onDelete?: (src: string) => void;
  setBackdropImageSrc?: (src: string | null) => void;
}

const ImagesList = ({ usedImages, unUsedImages, onDelete, setBackdropImageSrc }: IImagesList) => {

  return (
    <>
      <UsedImagesBlock
        images={usedImages}
        onDelete={onDelete}
        setBackdropImageSrc={setBackdropImageSrc}
      />

      <UnusedImagesBlock
        images={unUsedImages}
        onDelete={onDelete}
        setBackdropImageSrc={setBackdropImageSrc}
      />
    </>
  );
};

export default ImagesList;