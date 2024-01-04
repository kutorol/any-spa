import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Link } from "react-router-dom";
import useOpen from "../../../../hooks/useOpen";
import { GoogleRecaptchaV3SiteKey } from "../../../../store/constant";
import { getUrl } from "../../../../utils/funcs/url";
import Icon from "../../../Common/Gui/Common/Icon";
import TechSupport from "../../Special/TechSupport/TechSupport";
import AuthCardWrapper from "../LayoutTheme/AuthCardWrapper";
import AuthWrapper1 from "../LayoutTheme/AuthWrapper1";
import AuthFormLogin from "../Login/Form/AuthFormLogin";
import AuthFormPasswordReset from "../PasswordReset/Form/AuthFormPasswordReset";
import AuthFormPasswordResetConfirm from "../PasswordReset/Form/AuthFormPasswordResetConfirm";
import AuthFormRegister from "../Register/Form/AuthFormRegister";
import FooterGrid from "./FooterGrid";
import LogoHeader from "./LogoHeader";
import TitleGrid from "./TitleGrid";

interface IAuthFormWrapper {
  isLanding?: boolean;
  isRegister?: boolean;
  isPasswordReset?: boolean;
  isPasswordResetConfirm?: boolean;
}

const AuthFormWrapper = ({
                           isLanding,
                           isRegister = false,
                           isPasswordReset = false,
                           isPasswordResetConfirm = false
                         }: IAuthFormWrapper) => {
  const theme = useTheme();
  const { isOpen: isOpenSupport, toggle: toggleOpenSupport } = useOpen();

  const { t } = useLaravelReactI18n();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const onClickSupport = (e?: any) => {
    e && e.preventDefault();
    toggleOpenSupport();
  };

  const xsNum = 12;
  const grid1Sx = { minHeight: "100vh" };
  const grid2Sx = { minHeight: "calc(100vh - 68px)" };
  const grid3Sx = { m: { xs: 1, sm: 3 }, mb: 0 };
  const gridSpace = 2;
  const sxFooter = { m: 3, mt: 1 };

  let form = null;
  if (isRegister) {
    form = <AuthFormRegister/>;
  } else if (isPasswordReset) {
    form = <AuthFormPasswordReset/>;
  } else if (isPasswordResetConfirm) {
    form = <AuthFormPasswordResetConfirm/>;
  } else {
    form = <AuthFormLogin/>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={GoogleRecaptchaV3SiteKey}
      useRecaptchaNet={true}
      // container={{parameters: { theme: 'dark' }}}
    >
      {/* @ts-ignore */}
      <AuthWrapper1 isLanding={isLanding}>
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          sx={grid1Sx}
        >
          <Grid item xs={xsNum}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={grid2Sx}
            >
              <Grid item sx={grid3Sx}>
                <AuthCardWrapper>
                  <Grid
                    container
                    spacing={gridSpace}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <LogoHeader/>

                    <TitleGrid
                      xsNum={xsNum}
                      matchDownSM={matchDownSM}
                      themeColor={theme.palette.secondary.main}
                      isRegister={isRegister}
                      isPasswordReset={isPasswordReset}
                      isPasswordResetConfirm={isPasswordResetConfirm}
                    />

                    <Grid item xs={xsNum}>
                      {form}
                    </Grid>

                    <Grid item xs={xsNum}>
                      <Divider/>
                    </Grid>

                    <FooterGrid
                      xsNum={xsNum}
                      isRegister={isRegister}
                      isPasswordReset={isPasswordReset}
                    />
                  </Grid>
                </AuthCardWrapper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={xsNum} sx={sxFooter}>
            <Stack direction="row" justifyContent="flex-end">
              <TechSupport
                isOpen={isOpenSupport}
                toggle={onClickSupport}
              />

              <Typography
                component={Link}
                to={getUrl("/support-tech")}
                onClick={onClickSupport}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Icon tablerIcon="IconLifebuoy" size="1rem"/> <span>{t("Техническая поддержка")}</span>
                </Stack>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </AuthWrapper1>
    </GoogleReCaptchaProvider>
  );
};

export default AuthFormWrapper;
