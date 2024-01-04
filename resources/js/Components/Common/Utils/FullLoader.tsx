import { Grid, LinearProgress } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import AuthCardWrapper from "../../Pages/Auth/LayoutTheme/AuthCardWrapper";

// На весь экран полупрозрачный блок накладывает и спинер крутящийся в середине
const FullLoader = () => {
  const active = useSelector((s: RootState) => s.fullScreenLoader.active);
  if (!active) {
    return null;
  }

  return (
    <div className="background_load_ajax">
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <LinearProgress color={"secondary"} sx={{ minWidth: 150 }}/>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default FullLoader;