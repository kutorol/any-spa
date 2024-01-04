import { Grid } from "@mui/material";
import * as React from "react";
import useMatch from "../../../../../../hooks/useMatch";
import { IResponseAdminTechSupport } from "../../../../../../utils/interfaces/admin/tech-support";
import CustomMarkdown from "../../../../../Common/Gui/Text/CustomMarkdown";
import MainCard from "../../../../../Common/MainCard/MainCard";
import TitleAdminComment from "./TitleAdminComment";

interface IAdminComments {
  comments: IResponseAdminTechSupport[];
}

const AdminCommentsList = ({ comments }: IAdminComments) => {
  const { matchDownMd } = useMatch();

  const commentsTSX = comments.map((comment: IResponseAdminTechSupport, i: number) => (
    <Grid key={i} item xs={12} sx={{ mb: 3 }}>
      <MainCard
        boxShadow
        headerSX={matchDownMd ? { p: 1 } : { py: 1 }}
        title={<TitleAdminComment comment={comment}/>}
      >
        <CustomMarkdown text={comment.comment} prettyBtn/>
      </MainCard>
    </Grid>
  ));

  return (
    <>{commentsTSX}</>
  );
};

export default AdminCommentsList;
