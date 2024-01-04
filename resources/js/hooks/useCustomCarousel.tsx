import { Grid } from "@mui/material";
import * as React from "react";
import Carousel from "react-material-ui-carousel";
import useMatch from "./useMatch";

const useCustomCarousel = (byCount: number, items: any[], getItem: (item: any) => React.ReactNode): React.ReactNode => {
  const { matchDownMd } = useMatch();

  const sliderItems: number = matchDownMd ? 1 : (items.length > byCount ? byCount : items.length);
  const slideCounts: any[] = [];
  for (let i = 0; i < items.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      slideCounts.push(
        <React.Fragment key={i.toString()}>
          {items.slice(i, i + sliderItems).map((item: any) => getItem(item))}
        </React.Fragment>
      );
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Carousel
          fullHeightHover={false}
          autoPlay={false}
          animation="fade"
          navButtonsAlwaysVisible={slideCounts.length > 1}
          sx={{
            overflow: "visible"
          }}
        >
          {slideCounts}
        </Carousel>
      </Grid>
    </Grid>
  );
};

export default useCustomCarousel;