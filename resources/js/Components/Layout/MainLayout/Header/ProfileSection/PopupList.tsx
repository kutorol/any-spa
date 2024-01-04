import { ClickAwayListener, Paper, Popper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { toggleLoginPopup, toggleRegisterPopup } from "../../../../../utils/funcs/event";
import MainCard from "../../../../Common/MainCard/MainCard";
import Transitions from "../../../../Common/Transitions/Transitions";
import ListMenuLinksBlock from "./Components/ListMenuLinksBlock";
import NameBlock from "./Components/NameBlock";

interface IPopupList {
  anchorRef: any;
  isOpen: boolean;
  handleClose: (e: any) => void;
  onClickSupport: (e: any) => void;
  clickTo: (e: any) => void;
  handleTogglePopup?: () => void;
}

export interface IMenuLink {
  url: string;
  icon: string;
  title: string;
  // если true, то email должен быть подтвержден
  verified?: boolean;
  // если true, то только для анонимов
  anonym?: boolean;
  // если true, то нужно быть авторизованным
  auth?: boolean;
  divider?: boolean;
  onClick?: (e: React.SyntheticEvent) => void;
}

const PopupList = ({
                     anchorRef,
                     isOpen,
                     handleClose,
                     onClickSupport,
                     clickTo,
                     handleTogglePopup
                   }: IPopupList) => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  const menuLinks: IMenuLink[] = [
    { url: "/favorite/news", icon: "IconHeart", title: t("Избранное"), verified: true, auth: true },
    { url: "/settings/1", icon: "IconSettings", title: t("Настройки"), verified: true, auth: true },
    { url: "/logout", icon: "IconLogout", title: t("Выйти"), divider: true, auth: true },
    { url: "/news", icon: "IconPilcrow", title: t("Новости сайта"), verified: true },
    { url: "/login", icon: "IconLogin2", title: t("Войти в аккаунт"), anonym: true, onClick: toggleLoginPopup },
    { url: "/register", icon: "IconUserPlus", title: t("Регистрация"), anonym: true, onClick: toggleRegisterPopup },
    { url: "/password/reset", icon: "IconKeyOff", anonym: true, title: t("Забыли пароль?") },
    { url: "/support-tech", icon: "IconLifebuoy", title: t("Техническая поддержка"), onClick: onClickSupport }
  ];

  const popperOpt = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 14]
        }
      }
    ]
  };

  return (
    <Popper
      placement="bottom-end"
      open={isOpen}
      anchorEl={anchorRef.current}
      transition
      disablePortal
      popperOptions={popperOpt}
    >
      {({ TransitionProps }) => (
        <Transitions in={isOpen} {...TransitionProps}>
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MainCard
                border={false}
                // @ts-ignore
                elevation={16}
                content={false}
                boxShadow
                shadow={theme.shadows[16]}
              >
                <NameBlock/>

                <ListMenuLinksBlock
                  menuLinks={menuLinks}
                  handleTogglePopup={handleTogglePopup}
                  clickTo={clickTo}
                />
              </MainCard>
            </ClickAwayListener>
          </Paper>
        </Transitions>
      )}
    </Popper>
  );
};

export default PopupList;