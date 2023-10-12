import { Box, Button, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGoogleLogin } from "@react-oauth/google";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React from "react";
// @ts-ignore
import GoogleIcon from "../../../../assets/images/icons/social-google.svg";
import useGoogleRecaptcha from "../../../hooks/useGoogleRecaptcha";
import { GoogleFetchTokens } from "../../../utils/ajax/oauth/google-fetch-tokens";
import AnimateButton from "../AnimateButton/AnimateButton";

const GoogleBtnBlock = ({ isRegister = true }) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const style = { marginRight: matchDownSM ? 8 : 16 };

  const { handleReCaptchaVerify } = useGoogleRecaptcha({
    fromAction: "googleOAuth"
  });

  const login = useGoogleLogin({
    onSuccess: res => GoogleFetchTokens.onSuccess(res, handleReCaptchaVerify),
    onError: GoogleFetchTokens.onError,
    onNonOAuthError: GoogleFetchTokens.onNonOAuthError
  });

  const googleLogin = () => login();

  const sxBtn = {
    color: "grey.700",
    backgroundColor: theme.palette.grey[ 50 ],
    borderColor: theme.palette.grey[ 100 ],
    textTransform: "inherit"
  };

  const xs = 12;
  const sxBox = { mr: { xs: 1, sm: 2, width: 20 } };
  const iconWH = 16;

  const title = isRegister ? t("Регистрация через Google") : t("Вход через Google");

  return (
    <Grid item xs={xs}>
      {/*@ts-ignore*/}
      <AnimateButton>
        <Button
          variant="outlined"
          fullWidth
          onClick={googleLogin}
          size="large"
          sx={sxBtn}
        >
          <Box sx={sxBox}>
            <img src={GoogleIcon} alt="google" width={iconWH} height={iconWH} style={style}/>
          </Box>
          {title}
        </Button>
      </AnimateButton>
    </Grid>
  );
};

export default GoogleBtnBlock;