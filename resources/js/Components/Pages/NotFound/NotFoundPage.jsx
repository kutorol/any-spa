import React from 'react'
import { Button, Typography } from '@mui/material';
import MainCard from "../../Common/MainCard/MainCard";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate('/')
  };

  return (
    <MainCard title="Sample Card">
      <Typography variant="body2">
        404
      </Typography>

      <Button onClick={onClick} variant='outlined'>
        {'<- Go to home'}
      </Button>
    </MainCard>
  );
};

export default NotFoundPage;