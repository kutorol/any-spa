import React from 'react'
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MainCard from '../../../Common/MainCard/MainCard';

const AuthCardWrapper = ({ children, ...other }) => {
  const sxBox = { p: { xs: 2, sm: 3, xl: 5 } };
  const sxMain = {
    maxWidth: { xs: 400, lg: 475 },
    margin: { xs: 2.5, md: 3 },
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%'
    }
  };
  const content = false;

  return (
    <MainCard
      sx={sxMain}
      content={content}
      {...other}
    >
      <Box sx={sxBox}>{children}</Box>
    </MainCard>
  );
};

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthCardWrapper;
