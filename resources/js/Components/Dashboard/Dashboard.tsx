import { Container, Grid, Typography } from "@mui/material";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {
  // @ts-ignore
  const user = useSelector(s => s.userInfo.user);

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
