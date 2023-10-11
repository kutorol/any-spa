import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Dashboard() {
  const user = useSelector(state => state.userInfo.user);

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
  )
}

export default Dashboard
