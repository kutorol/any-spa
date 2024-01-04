import { Typography } from "@mui/material";
import * as React from "react";
import MainCard from "../../../Common/MainCard/MainCard";

const AdminMainPage = () => (
  // @ts-ignore
  <MainCard title="Sample Card">
    <Typography variant="body2">
      Главная админки
    </Typography>
  </MainCard>
);

export default AdminMainPage;