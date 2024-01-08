import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { EColor } from "../../../../utils/enums/common";
import Icon from "../Common/Icon";

interface IDashedLink {
  title: string;
  onClick: (e: React.SyntheticEvent) => void;
  icon?: string | React.ReactNode;
  colorHover?: EColor;
}

const DashedLink = ({ title, onClick, icon, colorHover = EColor.SECONDARY }: IDashedLink) => {
  const [hover, setHover] = useState<boolean>(false);
  let iconTSX = null;
  if (typeof icon === "string") {
    iconTSX = <Icon tablerIcon={icon} size="1rem"/>;
  } else {
    iconTSX = icon;
  }

  const onEnter = e => {
    colorHover && setHover(true);
  };

  const onLeave = e => {
    colorHover && setHover(false);
  };
  // Чтобы размер был по-содержимому, а не на всю длину
  const sx = { width: "fit-content" };

  // @ts-ignore
  if ([EColor.SUCCESS, EColor.INFO, EColor.WARNING].includes(colorHover)) {
    // @ts-ignore
    colorHover = `${colorHover}.main`;
  }

  const color = hover ? colorHover : undefined;
  const ml = { marginLeft: 5 };

  return (
    <Typography
      variant="subtitle2"
      align="center"
      color={color}
      onClick={onClick}
    >
      {iconTSX ? (
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Stack
            sx={sx}
            direction="row"
            alignItems="center"
            className="dashed-link"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {iconTSX} <span style={ml}>{title}</span>
          </Stack>
        </Stack>
      ) : (
        <span className="dashed-link">
          {title}
        </span>
      )}
    </Typography>
  );
};

export default DashedLink;
