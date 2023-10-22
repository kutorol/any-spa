import { Button, Typography } from "@mui/material";
// @ts-ignore
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainCard from "../../Common/MainCard/MainCard";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const { isLogged, verifiedEmail } = useSelector(s => ({
    // @ts-ignore
    verifiedEmail: s.userInfo.user.verified_email,
    // @ts-ignore
    isLogged: s.userInfo.isLogged
  }));

  const onClick = () => {
    let to = "/";
    if (isLogged && !verifiedEmail) {
      to = "/verify-email";
    }
    navigate(to);
  };

  return (
    // @ts-ignore
    <MainCard title="Sample Card">
      <Typography variant="body2">
        404
      </Typography>

      <Button onClick={onClick} variant="outlined">
        {"<- Go to home"}
      </Button>
    </MainCard>
  );
};

export default NotFoundPage;