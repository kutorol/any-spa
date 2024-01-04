import { AvatarGroup, Badge, Divider, Grid, IconButton, Skeleton, Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import MainCard from "../../Common/MainCard/MainCard";

const SkeletonNewsInfo = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const widthBtn = matchDownMd ? 56 : 130;

  return (
    <MainCard>
      <Grid container>
        <Grid item xs={12} order={{ xs: 3, sm: 1 }}>
          <Skeleton height={250} sx={{ mt: 2 }} animation="wave" variant="rectangular"/>
        </Grid>

        <Grid xs={12} item sx={{ my: 2 }} order={{ xs: 2, sm: 2 }}>
          <Divider/>
        </Grid>

        <Grid
          sx={{ minHeight: 45 }}
          item
          container
          xs={12}
          alignItems="center"
          justifyContent={"space-between"}
          order={{ xs: 1, sm: 3 }}
        >
          <Stack direction="row" alignItems="center">
            <Skeleton sx={{ mr: 1 }} height={38} width={widthBtn} animation="wave" variant="rounded"/>

            {(!matchDownMd) && (
              <AvatarGroup>
                <Skeleton height={40} width={40} animation="wave" variant="circular"/>
                <Skeleton height={40} width={40} animation="wave" variant="circular"/>
                <Skeleton height={40} width={40} animation="wave" variant="circular"/>
              </AvatarGroup>
            )}
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton disabled sx={{ mr: 1 }}>
              <Badge
                badgeContent={<Skeleton height={15} width={15} animation="wave" variant="circular"/>}
              >
                <Skeleton height={38} width={38} animation="wave" variant="circular"/>
              </Badge>
            </IconButton>

            <Skeleton sx={{ mr: 1 }} height={38} width={widthBtn} animation="wave" variant="rounded"/>
          </Stack>
        </Grid>
      </Grid>

    </MainCard>
  );
};

export default SkeletonNewsInfo;