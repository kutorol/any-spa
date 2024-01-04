import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// @ts-ignore
import React, { forwardRef, useEffect } from "react";

const commonHeaderSX = {
  "& .MuiCardHeader-action": { mr: 0 }
};

interface IMainCard {
  border?: boolean,
  boxShadow?: boolean,
  shadow?: string,
  children?: React.ReactNode,
  content?: boolean,
  contentClass?: string,
  contentSX?: object,
  headerSX?: object,
  darkTitle?: boolean,
  secondary?: React.ReactNode | string | object,
  sx?: { [key: string]: any },
  title?: React.ReactNode | string | object
  // от 0 до 24 (это расплывчатость тени)
  elevation?: number;
}

// @ts-ignore
const MainCard = forwardRef(({
                               border = true,
                               boxShadow,
                               children,
                               content = true,
                               contentClass = "",
                               contentSX = {},
                               headerSX = {},
                               darkTitle,
                               secondary,
                               shadow,
                               sx = {},
                               title,
                               elevation,
                               ...others
                             }: IMainCard, ref) => {
    const theme = useTheme();

    const titleTSX = title ? (darkTitle ? <Typography variant="h3">{title}</Typography> : title) : null;
    const cardSx = {
      border: border ? "1px solid" : "none",
      borderColor: theme.palette.primary[200] + 25,
      ":hover": {
        boxShadow: boxShadow ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)" : "inherit"
      },
      ...sx
    };

    const headerSXGenerate = {
      ...commonHeaderSX,
      ...headerSX
    };

    return (
      // @ts-ignore
      <Card
        ref={ref}
        elevation={elevation}
        {...others}
        sx={cardSx}
      >
        {title && (
          <>
            <CardHeader
              sx={headerSXGenerate}
              title={titleTSX}
              action={secondary}
            />

            <Divider/>
          </>
        )}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
