import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import Button from "./Button";
import Snackbar from "./Snackbar";
import TextField from "./TextField";
import Typography from "./Typography";

function ProductCTA() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "warning.dark",
              py: 8,
              px: 3
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
              <Typography variant="h2" component="h2" sx={{ fontSize: 48, textTransform: "uppercase" }} gutterBottom>
                Receive offers
              </Typography>
              <Typography variant="h5" sx={{ fontSize: 20, fontWeight: theme.typography.fontWeightLight }}>
                Taste the holidays of the everyday close to home.
              </Typography>
              <TextField
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: "100%", mt: 3, mb: 2 }}
              />
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ width: "100%" }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
              background: "url(/assets/images/landing/productCTAImageDots.png)"
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600
            }}
          />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        closeFunc={handleClose}
        message="We will send you our best offers, once a week."
      />
    </Container>
  );
}

export default ProductCTA;