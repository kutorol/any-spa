import { ListItemText } from "@mui/material";
import * as React from "react";
import SubTitleItem from "./SubTitleItem";
import TitleItem from "./TitleItem";

interface ITitlesBlock {
  title?: string;
  subtitle?: string;
  menuSelected: boolean;
}

const TitlesBlock = ({ title, subtitle, menuSelected }: ITitlesBlock) => {
  return (
    <ListItemText
      primary={<TitleItem title={title} menuSelected={menuSelected}/>}
      secondary={<SubTitleItem subtitle={subtitle}/>}
    />
  );
};

export default TitlesBlock;