import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import { getUrl } from "../../../utils/funcs/url";
import Button from "./Button";
import Typography from "./Typography";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium"
};

const image = {
  height: 55,
  my: 4
};

interface IProductHowItWorks {
  toggleRegister: (e: React.SyntheticEvent) => void;
}

function ProductHowItWorks({ toggleRegister }: IProductHowItWorks) {
  const theme = useTheme();
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Box
          component="img"
          src="/assets/images/landing/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7
          }}
        />
        <Typography variant="h4" marked="center" component="h2"
                    sx={{ color: "secondary.main", mb: 14, fontSize: 36, textTransform: "uppercase" }}>
          How it works
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src="/assets/images/landing/productHowItWorks1.svg"
                  alt="suitcase"
                  sx={image}
                />
                <Typography variant="h5" align="center"
                            sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  Appointment every Wednesday 9am.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src="/assets/images/landing/productHowItWorks2.svg"
                  alt="graph"
                  sx={image}
                />
                <Typography variant="h5" align="center"
                            sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  First come, first served. Our offers are in limited quantities, so
                  be quick.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src="/assets/images/landing/productHowItWorks3.svg"
                  alt="clock"
                  sx={image}
                />
                <Typography variant="h5" align="center"
                            sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                  {"New offers every week. New experiences, new surprises. "}
                  {"Your Sundays will no longer be alike."}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component={Link}
          to={getUrl("/register")}
          sx={{ mt: 8 }}
          onClick={toggleRegister}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;