import { Alert, Button, Grid, Link, Slide, SlideProps, Snackbar } from "@mui/material";
import { Location } from "@remix-run/router";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { cookieURL, privacyURL, termOfUseURL } from "../../../../routes/Components/SpecialRoutes";
import { RootState } from "../../../../store/store";
import { getUrl, navTo } from "../../../../utils/funcs/url";
import userRep from "../../../../utils/repository/user";
import DialogInfoCookie from "./DialogInfoCookie";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up"/>;
}

const cookieConfirmName = "confirm_cookie";
const cookieConfirmVal = "1";

export const hasConfirmCookieLocalStorage = (): boolean => {
  return localStorage.getItem(cookieConfirmName) === cookieConfirmVal;
};

export const isPrivacy = (loc: Location): boolean => {
  return loc.pathname === getUrl(privacyURL);
};

export const isCookie = (loc: Location): boolean => {
  return loc.pathname === getUrl(cookieURL);
};

const isTermOfUse = (loc: Location): boolean => {
  return loc.pathname === getUrl(termOfUseURL);
};

const CookieConfirm = () => {
  const { t } = useLaravelReactI18n();
  const loc = useLocation();
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(isPrivacy(loc) || isCookie(loc));

  const { user, isLogged, appInit } = useSelector((s: RootState) => ({
    user: s.userInfo.user,
    isLogged: s.userInfo.isLogged,
    appInit: s.appInit.init
  }));

  const onClose = (e: React.SyntheticEvent): void => {
    localStorage.setItem(cookieConfirmName, cookieConfirmVal);
    setSnackbarOpen(false);
    isLogged && userRep.confirmAgreement();
  };

  // было ли уже подтверждение с куками
  const wasConfirm = (): boolean => {
    // @ts-ignore
    return (user.uid > 0 && user.agreement_confirmed_at) || (!user.uid && hasConfirmCookieLocalStorage());
  };

  useEffect(() => {
    if (!isOpenDialog && appInit && !wasConfirm() && !isTermOfUse(loc) && !isCookie(loc) && !isPrivacy(loc)) {
      setTimeout(() => {
        setSnackbarOpen(true);
      }, 1000);
    }
  }, [isOpenDialog, appInit, user, loc.pathname]);

  const onClosePrivacy = (): void => {
    setIsOpenDialog(false);
    if (!wasConfirm() && !isTermOfUse(loc)) {
      setSnackbarOpen(true);
    }
  };

  const onCloseDialog = (e: React.SyntheticEvent): void => {
    navTo("/");
  };

  useEffect(() => {
    if (isPrivacy(loc) || isCookie(loc)) {
      setSnackbarOpen(false);
      setIsOpenDialog(true);
    } else {
      onClosePrivacy();
    }
  }, [loc.pathname]);

  return (
    <>
      <DialogInfoCookie
        isOpenDialog={isOpenDialog}
        onCloseClick={onCloseDialog}
      />

      {/* @ts-ignore */}
      <Snackbar
        ClickAwayListenerProps={{ onClickAway: () => null }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={snackbarOpen}
        TransitionComponent={SlideTransition}
      >
        <Grid container justifyContent="space-between">
          <Alert
            variant="filled"
            severity="info"
            action={
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                onClick={onClose}
              >
                {t("ОК")}
              </Button>
            }
          >
            {t("Пользуясь нашим сайтом, вы соглашаетесь с тем, что мы используем")}
            &nbsp;
            <Link
              color={"primary.light"}
              onClick={e => {
                e && e.preventDefault();
                navTo(cookieURL);
              }}
              href={getUrl(cookieURL)}
            >
              {t("cookies")}
            </Link>
          </Alert>
        </Grid>
      </Snackbar>
    </>
  );
};

export default CookieConfirm;