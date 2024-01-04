import { Stack, Typography } from "@mui/material";
import * as React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Link } from "react-router-dom";
import { humanDateTime } from "../../../../../../utils/funcs/date";
import { IResponseAdminTechSupport } from "../../../../../../utils/interfaces/admin/tech-support";
import UserAvatar from "../../../../../Common/Gui/Img/UserAvatar";
import ChipStatus from "./ChipStatus";

interface ITitleAdminComment {
  comment: IResponseAdminTechSupport;
}

const TitleAdminComment = ({ comment }: ITitleAdminComment) => {
  const avatar = <UserAvatar src={comment.avatar}/>;
  const linkToAdmin = (
    <Typography variant="body1" color="inherit" sx={{ ml: 2 }}>
      <Link to={`/admin/users/1`}>
        {comment.admin_name}
      </Link>
    </Typography>
  );

  const chip = <ChipStatus status={comment.status}/>;

  const date = (
    <Typography variant="caption">
      {humanDateTime(comment.created_at)}
    </Typography>
  );
  return (
    <>
      <BrowserView>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            {avatar}
            {linkToAdmin}
          </Stack>
          {chip}
          {date}
        </Stack>
      </BrowserView>

      <MobileView>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {avatar}
          {linkToAdmin}
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {date}
          {chip}
        </Stack>
      </MobileView>
    </>

  );
};

export default TitleAdminComment;