import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { Link } from "react-router-dom";
import { ELanguages } from "../../../../../utils/enums/user";
import { IDuplicateValues } from "../../../../../utils/interfaces/admin/news";
import Btn from "../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../Common/Gui/Common/Icon";
import SelectBlock from "../../../../Common/Gui/Select/Plain/SelectBlock";

interface IMainHeader {
  newsID?: number;
  newsTitle: string;
  titleSelect?: string;
  newsLocale: ELanguages;
  draftExists?: boolean;
  onClickSetDraft?: () => void;
  onChangeLang?: (l: ELanguages) => void;
  variants: IDuplicateValues;
}

const MainHeader = ({
                      newsID,
                      newsTitle,
                      titleSelect,
                      variants,
                      newsLocale,
                      draftExists = false,
                      onClickSetDraft = () => {
                      },
                      onChangeLang = () => {
                      }
                    }: IMainHeader) => {
  const { t } = useLaravelReactI18n();

  const onChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
    onChangeLang(e.target.value as ELanguages);
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      {(newsID > 0) ? (
        <Link to={`/${newsLocale}/news/${newsID}`} target="_blank">{newsTitle}</Link>
      ) : newsTitle}

      {draftExists && (
        <Btn
          sx={{ p: "6px 16px" }}
          webTitle={t("Восстановить черновик")}
          mobTitle={t("Черновик")}
          icon={<Icon tablerIcon="IconNotes"/>}
          onClick={onClickSetDraft}
        />
      )}

      <SelectBlock
        name="status"
        label={titleSelect || t("Эта статья на другом языке")}
        // @ts-ignore
        variants={variants}
        onChange={onChange}
        chosenVariant={newsLocale}
      />
    </Grid>
  );
};

export default MainHeader;