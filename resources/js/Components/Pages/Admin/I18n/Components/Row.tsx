import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip, IconButton, TableCell, TableRow, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../../store/store";
import { ELanguages } from "../../../../../utils/enums/user";
import { getLocaleName } from "../../../../../utils/funcs/locale";
import { II18n } from "../../../../../utils/interfaces/admin/i18n";
import Btn from "../../../../Common/Gui/Btn/Btn";
import Input from "./Input";

interface IRow {
  item: II18n;
  onChangeVal: (label: string, locale: ELanguages, val: string) => void;
  isChild?: boolean;
}

const Row = ({ item, onChangeVal, isChild }: IRow) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const rowSx = { "& > *": { borderBottom: "unset" } };
  const split = item.label.split("_");
  const seoTag = (split[1] || "-/-").toLowerCase();

  const path = split.filter((a, i: number) => i > 1).join("/");

  // @ts-ignore
  const childs = (!isOpen || isChild) ? null : Object.values(ELanguages).map((l: ELanguages, i: number) => {
    if (l === ELanguages.RU) {
      return null;
    }

    // @ts-ignore
    let otherLocaleI18n = (item.other_langs || []).find((i: II18n) => i.locale === l);
    if (!otherLocaleI18n) {
      otherLocaleI18n = {
        id: 0,
        label: item.label,
        locale: l,
        value: ""
      } as II18n;
    }

    return (
      <Row
        key={i}
        item={otherLocaleI18n}
        onChangeVal={onChangeVal}
        isChild
      />
    );
  });

  const langTitle = `${getLocaleName(item.locale)} (${item.locale.toUpperCase()})`;
  const tagColor = seoTag === "title"
    ? "success"
    : (seoTag === "h1" ? "info" : "default");

  const userLocale: ELanguages = useSelector((s: RootState) => s.userInfo.user.locale);
  const toURL = `/${userLocale.toLowerCase()}/${path}`;

  return (
    <>
      <TableRow selected={isChild} sx={rowSx}>

        <TableCell align="center">
          {(!isChild) && (
            <Btn
              webTitle={path}
              mobTitle={path}
              to={toURL}
              component={Link}
              target="_blank"
            />
          )}
        </TableCell>

        <TableCell align="center">
          {(!isChild) && (
            <Chip label={seoTag} size="small" color={tagColor}/>
          )}
        </TableCell>

        <TableCell align="center">
          <Input
            item={item}
            onChangeVal={onChangeVal}
          />
        </TableCell>
        <TableCell align="center">
          <Typography variant="caption">
            {isChild ? (langTitle) : <Chip label={langTitle}/>}
          </Typography>
        </TableCell>


        <TableCell align="center">
          {(!isChild) && (
            <IconButton
              color={isOpen ? "error" : "secondary"}
              size="small"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            </IconButton>
          )}
        </TableCell>

      </TableRow>

      {childs}
    </>
  );


};

export default Row;