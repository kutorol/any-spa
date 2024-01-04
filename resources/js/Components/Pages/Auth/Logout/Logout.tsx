import { Box, Grid, LinearProgress, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useScriptRef from "../../../../hooks/useScriptRef";
import { RootState } from "../../../../store/store";
import { navTo } from "../../../../utils/funcs/url";
import userAuth from "../../../../utils/repository/user-auth";
import AuthCardWrapper from "../LayoutTheme/AuthCardWrapper";
import AuthWrapper1 from "../LayoutTheme/AuthWrapper1";

const Logout = () => {
  const { t } = useLaravelReactI18n();
  // @ts-ignore
  const [isLogged, setIsLogged] = useState<boolean>(useSelector((s: RootState) => s.userInfo.isLogged));
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const r = useScriptRef();

  const xsNum = 12;
  const grid1Sx = { minHeight: "100vh" };
  const grid2Sx = { minHeight: "calc(100vh - 68px)" };
  const grid3Sx = { m: { xs: 1, sm: 3 }, mb: 0 };
  const gridSpace = 2;
  const direction = matchDownSM ? "column-reverse" : "row";
  const variant = matchDownSM ? "h3" : "h2";
  const spacing = 1;


  useEffect(() => {
    if (isLogged && r.current) {
      r.current = false;
      userAuth.logout().then((res: boolean) => res && setIsLogged(false));
    } else if (!isLogged && r.current) {
      navTo("/");
    }

    return () => {
    };
  }, [isLogged]);

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
                  <Grid item xs={xsNum}>
                    <Grid
                      container
                      direction={direction}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={spacing}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={variant}
                          >
                            {t("Выход...")}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={xsNum}>
                    <Box sx={{ width: "100%" }}>
                      <LinearProgress color={"secondary"}/>
                    </Box>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Logout;