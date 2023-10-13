import { Divider, Grid, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// @ts-ignore
import React from "react";
import AuthCardWrapper from "../LayoutTheme/AuthCardWrapper";
import AuthWrapper1 from "../LayoutTheme/AuthWrapper1";
import AuthFormLogin from "../Login/Form/AuthFormLogin";
import AuthFormPasswordReset from "../PasswordReset/Form/AuthFormPasswordReset";
import AuthFormPasswordResetConfirm from "../PasswordReset/Form/AuthFormPasswordResetConfirm";
import AuthFormRegister from "../Register/Form/AuthFormRegister";
import FooterGrid from "./FooterGrid";
import LogoHeader from "./LogoHeader";
import TitleGrid from "./TitleGrid";

const AuthFormWrapper = ({ isRegister = false, isPasswordReset = false, isPasswordResetConfirm = false }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

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
    <AuthWrapper1>
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
          <Stack direction="row" justifyContent="space-between"/>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default AuthFormWrapper;
