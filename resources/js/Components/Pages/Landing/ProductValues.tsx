import { Box, Container, Grid } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Typography from "./Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5
};

function ProductValues() {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h4"
        marked="center"
        align="center"
        component="h2"
        sx={{ color: "secondary.main", fontSize: 36, textTransform: "uppercase", py: 5, pt: 6 }}
      >
        For all tastes and all desires
      </Typography>

      <Box
        component="section"
        sx={{ display: "flex", overflow: "hidden", bgcolor: "secondary.light" }}
      >

        <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>

          <Box
            component="img"
            src="/assets/images/landing/productCurvyLines.png"
            alt="curvy lines"
            sx={{ pointerEvents: "none", position: "absolute", top: -180 }}
          />
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/assets/images/landing/productValues1.svg"
                  alt="graph"
                  sx={{ height: 55 }}
                />
                <Typography variant="h6" sx={{ my: 5, fontSize: 18 }}>
                  {t("Лучшие роскошные отели")}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  {t("От новейшего модного бутик-отеля до культового дворца с бассейном размера XXL, отправляйтесь в мини-отпуск всего в нескольких остановках метро от дома.")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/assets/images/landing/productValues2.svg"
                  alt="graph"
                  sx={{ height: 55 }}
                />
                <Typography variant="h6" sx={{ my: 5, fontSize: 18, fontWeight: theme.typography.fontWeightMedium }}>
                  {t("Новый опыт")}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  {t("Приватизируйте бассейн, примите японскую ванну или проснитесь в саду площадью 900 м²... ваши воскресенья не будут одинаковыми.")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box
                  component="img"
                  src="/assets/images/landing/productValues3.svg"
                  alt="clock"
                  sx={{ height: 55 }}
                />
                <Typography variant="h6" sx={{ my: 5, fontSize: 18, fontWeight: theme.typography.fontWeightMedium }}>
                  {t("Эксклюзивные цены")}
                </Typography>
                <Typography variant="h5" sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  {t("Зарегистрировавшись, вы получите доступ к специально согласованным тарифам, которых больше нигде не найдете.")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default ProductValues;