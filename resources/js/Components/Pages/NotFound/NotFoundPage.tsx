import { Button, Typography } from "@mui/material";
// @ts-ignore
import React from "react";
import { useNavigate } from "react-router-dom";
import MainCard from "../../Common/MainCard/MainCard";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
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