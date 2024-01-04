import { Card, CardActions, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";
import * as React from "react";

interface ICardSkeleton {
  withGridItem?: boolean;
  countSkeleton?: number;
}

const CardSkeleton = ({ withGridItem = false, countSkeleton = 1 }: ICardSkeleton) => {
  const item = (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        disableTypography
        title={
          <Skeleton animation="wave" width="80%" height={20} sx={{ mb: 0.5 }}/>
        }
        subheader={
          <Skeleton animation="wave" height={20} width="40%"/>
        }
      />
      <Skeleton height={190} animation="wave" variant="rectangular"/>
      <CardContent>
        <Skeleton height={20} animation="wave"/>
        <Skeleton height={20} animation="wave"/>
        <Skeleton height={20} animation="wave"/>
        <Skeleton height={20} animation="wave"/>
        <Skeleton height={20} animation="wave"/>
        <Skeleton height={20} animation="wave"/>
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton width={33} height={33} animation="wave" variant="circular" sx={{ mr: 1 }}/>
        <Skeleton width={33} height={33} animation="wave" variant="circular"/>
        <Skeleton width={33} height={33} animation="wave" variant="circular" sx={{ marginLeft: "auto" }}/>
      </CardActions>
    </Card>
  );

  const items = [];
  for (let i = 0; i < countSkeleton; i++) {
    if (withGridItem) {
      items.push(
        <Grid item xs={12} md={3} key={i}>{item}</Grid>
      );
    } else {
      items.push(
        <React.Fragment key={i}>{item}</React.Fragment>
      );
    }

  }

  return (
    <>
      {items}
    </>
  );
};

export default CardSkeleton;