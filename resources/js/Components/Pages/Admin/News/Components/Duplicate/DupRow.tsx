import { TableCell, TableRow } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import { toNumber } from "lodash";
import * as React from "react";
import { Link } from "react-router-dom";
import { ELanguages } from "../../../../../../utils/enums/user";
import { getLocaleName } from "../../../../../../utils/funcs/locale";
import { IDuplicateValues } from "../../../../../../utils/interfaces/admin/news";
import { IShortNewsInterface } from "../../../../../../utils/interfaces/news";
import Btn from "../../../../../Common/Gui/Btn/Btn";
import CustomInput from "../../../../../Common/Inputs/CustomInput";

interface IDupRow {
  l: ELanguages;
  setDuplicateValues: (v: IDuplicateValues | ((prevState: IDuplicateValues) => IDuplicateValues)) => void;
  duplicateValues: IDuplicateValues;
  dupNews?: IShortNewsInterface;
  onFindDuplicate: (currentID: null | number, newID: number, l: ELanguages) => void;
}

const DupRow = ({
                  l,
                  onFindDuplicate,
                  setDuplicateValues,
                  dupNews,
                  duplicateValues
                }: IDupRow) => {

  const { t } = useLaravelReactI18n();

  const _onChange = (e: React.ChangeEvent<any>): void => {
    const val = e.target.value.trim();
    setDuplicateValues({
      ...duplicateValues,
      [l]: val
    });
  };

  const _onBlur = (e: React.FocusEvent<any>): void => {
    return onFindDuplicate(
      dupNews ? dupNews.id : null,
      toNumber(e.target.value.trim()),
      l
    );
  };

  return (
    <TableRow>
      <TableCell align="center">{getLocaleName(l)} ({l.toString()})</TableCell>
      <TableCell align="center">
        <CustomInput
          name={l.toString()}
          title={t("ID на дублирующую статью")}
          handleChange={_onChange}
          handleBlur={_onBlur}
          values={duplicateValues}
        />
      </TableCell>

      <TableCell align="center">
        {dupNews ? (
          <Btn
            webTitle={dupNews.title}
            mobTitle={dupNews.title}
            component={Link}
            to={`/${dupNews.locale}/news/${dupNews.id}/${dupNews.slug}`}
            target="_blank"
          />
        ) : (
          "-/-"
        )}
      </TableCell>
    </TableRow>
  );
};

export default DupRow;