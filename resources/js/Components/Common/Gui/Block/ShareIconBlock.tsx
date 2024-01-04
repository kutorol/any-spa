import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ShareIcon from "@mui/icons-material/Share";
import { Fade, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import * as React from "react";
import useCopyAction from "../../../../hooks/useCopyAction";
import { EShareSocial } from "../../../../utils/enums/user";
import Btn from "../Btn/Btn";
import Icon from "../Common/Icon";

interface IShareIconBlock {
  shareLink?: string;
  title: string;
  img?: string;
  desc?: string;
  exceptSocial?: EShareSocial[];
  titleBtn?: string;
}

interface ISocialInfo {
  icon: string;
  title: string;
  id: EShareSocial;
}

const ShareIconBlock = ({ titleBtn, shareLink, title, img, desc, exceptSocial = [] }: IShareIconBlock) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const copyFunc = useCopyAction(t("Ссылка скопирована"), t("Не удалось скопировать ссылку"));

  const handleShare = (link: string, id: EShareSocial, close: () => void) => (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (id === EShareSocial.COPY_LINK) {
      copyFunc(link, () => close());
      return;
    }

    openWindow(link);
    close();
  };

  const openWindow = (socialLink: string): void => {
    window.open(socialLink, "_blank");
  };

  const getHrefTo = (id: EShareSocial): string => {
    const fullLink = shareLink ? `${window.location.origin}${shareLink}` : window.location.href;
    const encodedFullLink = encodeURIComponent(fullLink);
    const encodedTitle = encodeURIComponent(title);
    const encodedImg = img ? encodeURIComponent(img) : null;
    const encodedDesc = desc ? encodeURIComponent(desc) : null;

    switch (id) {
      case EShareSocial.WHATSAPP:
        return `https://wa.me/?text=${encodedTitle}%0a${encodedFullLink}`;

      case EShareSocial.TELEGRAM:
        return `https://t.me/share/url?url=${encodedFullLink}&text=${encodedTitle}`;

      case EShareSocial.FACEBOOK:
        return `https://www.facebook.com/sharer/sharer.php?u=${fullLink}`;

      case EShareSocial.TWITTER:
        return `https://twitter.com/intent/tweet?url=${encodedFullLink}`;

      case EShareSocial.REDDIT:
        return `https://www.reddit.com/submit?url=${encodedFullLink}`;

      case EShareSocial.VK:
        return `https://vk.com/share.php?noparse=true&title=${encodedTitle}&url=${encodedFullLink}${img ? `&image=${encodedImg}` : ""}`;

      case EShareSocial.OK:
        return `https://connect.ok.ru/offer?url=${encodedFullLink}&title=${encodedTitle}${img ? `&imageUrl=${encodedImg}` : ""}${desc ? `&description=${encodedDesc}` : ""}`;

      case EShareSocial.COPY_LINK:
        return fullLink;
    }

    return "";
  };

  const allIcons: ISocialInfo[] = [
    { icon: "IconBrandWhatsapp", id: EShareSocial.WHATSAPP, title: t("WhatsApp") },
    { icon: "IconBrandTelegram", id: EShareSocial.TELEGRAM, title: t("Telegram") },
    // { icon: "FacebookIcon", id: EShareSocial.FACEBOOK, title: t("Facebook") },
    // { icon: "TwitterIcon", id: ShEShareSocialareSocial.TWITTER, title: t("Twitter") },
    // { icon: "RedditIcon", id: ShEShareSocialareSocial.REDDIT, title: t("Reddit") },
    { icon: "IconBrandVk", id: EShareSocial.VK, title: t("VK") },
    { icon: "IconBrandOkRu", id: EShareSocial.OK, title: t("OK") },
    { icon: "IconLink", id: EShareSocial.COPY_LINK, title: t("Копировать ссылку") }
  ];

  const icons: ISocialInfo[] = allIcons.filter(i => (exceptSocial || []).indexOf(i.id) === -1);

  if (icons.length === 0) {
    return null;
  }

  return (
    <PopupState variant="popper">
      {(popupState) => (
        <>
          {titleBtn ? (
            <Btn
              color={popupState.isOpen ? "secondary" : "inherit"}
              variant={popupState.isOpen ? "contained" : "text"}
              icon={<ShareIcon/>}
              webTitle={titleBtn}
              {...bindToggle(popupState)}
              sx={{ p: "6px 16px" }}
            />
          ) : (
            <IconButton
              color={popupState.isOpen ? "secondary" : "default"}
              {...bindToggle(popupState)}
            >
              <ShareIcon/>
            </IconButton>
          )}


          <Popper
            {...bindPopper(popupState)}
            transition
            sx={{
              "& .MuiPaper-root": {
                boxShadow: theme.shadows[24],
                borderRadius: 2
              },
              "& .MuiButtonBase-root:first-child": {
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
              },
              "& .MuiButtonBase-root:last-child": {
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0
              },
              zIndex: 2
            }}
          >
            {({ TransitionProps }) => (
              <Fade
                {...TransitionProps}
                timeout={350}
              >

                <Paper>
                  <ClickAwayListener onClickAway={e => popupState.close()}>
                    <List dense sx={{ p: 0 }}>
                      {icons.map(((item, i) => (
                        <ListItemButton
                          key={i}
                          onClick={handleShare(getHrefTo(item.id), item.id, popupState.close)}
                          component="a"
                          href={getHrefTo(item.id)}
                        >
                          <ListItemIcon>
                            <Icon tablerIcon={item.icon} size={undefined} stroke={undefined}/>
                          </ListItemIcon>
                          <ListItemText primary={item.title}/>
                        </ListItemButton>
                      )))}
                    </List>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      )}
    </PopupState>
  );
};

export default ShareIconBlock;