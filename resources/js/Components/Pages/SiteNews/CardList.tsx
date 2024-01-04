import { Grid } from "@mui/material";
import * as React from "react";
import { getUrl } from "../../../utils/funcs/url";
import { IShortNewsInterface } from "../../../utils/interfaces/news";
import NotFoundAlert from "../../Common/Gui/Block/NotFoundAlert";
import CustomCard from "../../Common/Gui/Card/CustomCard";

interface ICardList {
  list: IShortNewsInterface[];
  onToggleLike: (id: number) => void;
  notFoundText?: React.ReactNode | string;
  cardSx?: object;
}

const CardList = ({ list, onToggleLike, notFoundText, cardSx }: ICardList) => {
  if (list.length === 0) {
    return (
      <Grid item xs={12}>
        <NotFoundAlert subTitle={notFoundText}/>
      </Grid>
    );
  }

  return (
    <>
      {list.map((item: IShortNewsInterface) => (
        <Grid
          item
          xs={12}
          md={3}
          key={item.id}
          sx={cardSx}
        >
          <CustomCard
            item={item}
            prefixURL={getUrl(`/news`)}
            onToggleLike={onToggleLike}
          />
        </Grid>
      ))}
    </>
  );
};

export default CardList;