import { Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Dashboard() {
  // @ts-ignore
  const user = useSelector((s: RootState) => s.userInfo.user);

  return (
    <React.Fragment>
      <Container>
        <Grid container justifyContent={"center"}>
          <Grid item md={12}>
            <Typography variant={"h5"}>
              Hello {user.full_name}, you're logged in!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Dashboard;
