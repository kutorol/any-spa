import { Grid } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { IInfoProblemData } from "../../../../../../utils/interfaces/admin/tech-support";
import CustomMarkdown from "../../../../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../../../../Common/MainCard/MainCard";
import ImageList from "./ImageList";

interface IProblemComment {
  info: IInfoProblemData;
  onDeleteAttach: (id: number) => void;
  setBackdropImageUrl: (url: string | null) => void;
}

const ProblemComment = ({ info, onDeleteAttach, setBackdropImageUrl }: IProblemComment) => {
  const { t } = useLaravelReactI18n();

  return (
    <Grid container>

      <Grid item xs={12}>
        <MainCard boxShadow title={t("Текст запроса")} headerSX={{ py: 2 }}>
          <CustomMarkdown text={info.problem.comment} prettyBtn/>
        </MainCard>
      </Grid>

      <ImageList
        attachments={info.attachments}
        onDeleteAttach={onDeleteAttach}
        setBackdropImageUrl={setBackdropImageUrl}
      />
    </Grid>
  );
};

export default ProblemComment;