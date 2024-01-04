import { Chip, Stack, TableCell, TableRow as TableRowMui, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { ELanguages } from "../../../../../utils/enums/user";
import { humanDate } from "../../../../../utils/funcs/date";
import { getLocaleName } from "../../../../../utils/funcs/locale";
import { getUrl } from "../../../../../utils/funcs/url";
import { IShortNewsInterface } from "../../../../../utils/interfaces/news";
import Btn from "../../../../Common/Gui/Btn/Btn";
import UserAvatar from "../../../../Common/Gui/Img/UserAvatar";

interface ITableRow {
  news: IShortNewsInterface;
}

const TableRow = ({ news }: ITableRow) => {
  const colorLang = news.locale === ELanguages.RU ? "default" : "secondary";
  const titleBtn = news.id.toString();
  const title = news.title.length > 100 ? news.title.slice(0, 100) + "..." : news.title;

  return (
    <TableRowMui hover>
      <TableCell align="center">
        <Btn
          component={Link}
          color="primary"
          to={getUrl(`/admin/news/${news.id}`)}
          webTitle={titleBtn}
          mobTitle={titleBtn}
        />
      </TableCell>
      <TableCell align="center">
        <Stack direction="row" alignItems="center" justifyContent="center">
          <UserAvatar
            variant="square"
            src={news.image}
          />
        </Stack>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">
          {title}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Chip
          size="small"
          color={colorLang}
          label={`${getLocaleName(news.locale)} (${news.locale.toUpperCase()})`}
        />
      </TableCell>
      <TableCell align="center"><Typography variant="caption">{news.views}</Typography></TableCell>
      <TableCell align="center"><Typography variant="caption">{news.likes}</Typography></TableCell>
      <TableCell align="center">
        <Typography variant="caption">{humanDate(news.created_at)}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="caption">{humanDate(news.updated_at)}</Typography>
      </TableCell>
    </TableRowMui>
  );
};

export default TableRow;