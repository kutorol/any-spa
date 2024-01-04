import { Box, Link } from "@mui/material";
import * as React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { ILinkFooter } from "../../../../../../utils/interfaces/main-page";
import Typography from "../Typography";

interface ILinkList {
  title: string;
  links: ILinkFooter[];
}

const LinkList = ({ title, links }: ILinkList) => {
  const liSx = { py: 0.5 };
  const ulSx = { m: 0, listStyle: "none", p: 0 };
  const titleSx = { fontSize: 18, textTransform: "uppercase" };

  const items = links.map((link: ILinkFooter, i: number) => (
    <Box key={i} component="li" sx={liSx}>
      <Link
        component={LinkRouter}
        to={link.url}
        onClick={link.onClick}
      >
        {link.title}
      </Link>
    </Box>
  ));

  return (
    <>
      <Typography
        variant="h6"
        marked="left"
        gutterBottom
        sx={titleSx}
      >
        {title}
      </Typography>

      <Box component="ul" sx={ulSx}>
        {items}
      </Box>
    </>
  );
};

export default LinkList;