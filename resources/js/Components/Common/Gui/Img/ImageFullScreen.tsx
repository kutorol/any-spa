import { Backdrop, ClickAwayListener, Stack } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import useOnEscape from "../../../../hooks/useOnEscape";
import Btn from "../Btn/Btn";
import Icon from "../Common/Icon";

interface IImageFullScreen {
  setBackdropImageUrl: (url: string | null) => void;
  url?: string;
}

const ImageFullScreen = ({ url, setBackdropImageUrl }: IImageFullScreen) => {
  const { t } = useLaravelReactI18n();
  const backdropSx = { zIndex: (theme) => theme.zIndex.drawer + 1 };

  const onClose = e => setBackdropImageUrl(null);

  const onOpenOriginal = e => {
    window.open(url, "_blank");
    setBackdropImageUrl(null);
  };

  useOnEscape(() => setBackdropImageUrl(null));

  if (!url) {
    return null;
  }

  const sxBtn = { position: "absolute", top: 10, right: 10 };
  return (
    <Backdrop sx={backdropSx} open>
      <ClickAwayListener onClickAway={onClose}>
        <>
          <Stack direction="row" sx={sxBtn} alignItems="center">
            <Btn
              sx={{ mr: 2 }}
              variant="contained"
              color="inherit"
              webTitle={t("Открыть оригинал")}
              mobTitle={t("Оригинал")}
              icon={<Icon tablerIcon="IconExternalLink"/>}
              onClick={onOpenOriginal}
            />

            <Btn
              variant="contained"
              color="secondary"
              webTitle={t("Закрыть")}
              icon={<Icon tablerIcon="IconX"/>}
              onClick={onClose}
            />
          </Stack>

          <img
            src={url}
            width="60%"
            style={{ maxHeight: "60%" }}
            alt="full screen image"
          />
        </>
      </ClickAwayListener>
    </Backdrop>
  );
};

export default ImageFullScreen;