import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import * as React from "react";
import Typography from "./Typography";

function ProductSmokingHero() {
  return (
    <Container
      component="section"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 9 }}
    >
      <Button
        color="secondary"
        sx={{
          border: "4px solid currentColor",
          borderRadius: 0,
          height: "auto",
          py: 2,
          px: 5
        }}
      >
        <Typography variant="h4" component="span"
                    sx={{ color: "secondary.main", fontSize: 36, textTransform: "uppercase" }}>
          Остались вопросы? Нажми!
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3, fontSize: 18 }}>
        Мы обязательно поможем вам
      </Typography>
      <Box
        component="img"
        src="/assets/images/landing/productBuoy.svg"
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
  );
}

export default ProductSmokingHero;