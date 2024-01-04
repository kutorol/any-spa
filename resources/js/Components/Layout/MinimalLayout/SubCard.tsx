import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { forwardRef } from "react";

interface ISubCard {
  children?: React.ReactNode,
  content?: boolean,
  contentClass?: string,
  darkTitle?: boolean,
  secondary?: React.ReactNode | string | object,
  sx?: { [key: string]: any },
  contentSX?: object,
  title?: React.ReactNode | string | object
}

const SubCard = forwardRef(({
                              children,
                              content = true,
                              contentClass,
                              darkTitle,
                              secondary,
                              sx = {},
                              contentSX = {},
                              title,
                              ...others
                            }: ISubCard, ref) => {
  const theme = useTheme();

  return (
    // @ts-ignore
    <Card
      ref={ref}
      sx={{
        border: "1px solid",
        borderColor: theme.palette.primary.light,
        ":hover": {
          boxShadow: "0 2px 14px 0 rgb(32 40 45 / 8%)"
        },
        ...sx
      }}
      {...others}
    >
      {/* card header and action */}
      {!darkTitle && title &&
        <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary}/>}
      {darkTitle && title &&
        <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary}/>}

      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: theme.palette.primary.light
          }}
        />
      )}

      {/* card content */}
      {content && (
        <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ""}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});


export default SubCard;
