import { Grid, Table, TableBody, TableContainer } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { ELanguages } from "../../../../../utils/enums/user";
import { IDuplicateValues } from "../../../../../utils/interfaces/admin/news";
import { IShortNewsInterface } from "../../../../../utils/interfaces/news";
import MainCard from "../../../../Common/MainCard/MainCard";
import DupRow from "./Duplicate/DupRow";
import DupTableHead from "./Duplicate/DupTableHead";

interface IDuplicateNewsBlock {
  currentLocale: ELanguages;
  setDuplicateValues: (v: IDuplicateValues | ((prevState: IDuplicateValues) => IDuplicateValues)) => void;
  duplicateValues: IDuplicateValues;
  duplicates: IShortNewsInterface[];
  onFindDuplicate: (currentID: null | number, newID: number, l: ELanguages) => void;
}

const DuplicateNewsBlock = ({
                              currentLocale,
                              onFindDuplicate,
                              setDuplicateValues,
                              duplicates,
                              duplicateValues
                            }: IDuplicateNewsBlock) => {
  const { t } = useLaravelReactI18n();

  return (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <MainCard
        boxShadow
        title={t("Дубликаты новости на других языках")}
        headerSX={{ py: 1.5 }}
      >
        <TableContainer sx={{ mb: 3 }}>
          <Table>
            <DupTableHead/>
            <TableBody>
              {/* @ts-ignore*/}
              {Object.values(ELanguages).map((l: ELanguages, i: number) => {
                if (l === currentLocale) {
                  return null;
                }

                // @ts-ignore
                const d = duplicates.find((d: IShortNewsInterface) => d.locale === l);
                return (
                  <DupRow
                    key={i}
                    l={l}
                    onFindDuplicate={onFindDuplicate}
                    setDuplicateValues={setDuplicateValues}
                    dupNews={d}
                    duplicateValues={duplicateValues}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>
    </Grid>
  );
};

export default DuplicateNewsBlock;