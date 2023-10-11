import React from 'react'
import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Drawer, Stack, Tooltip, useMediaQuery } from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MenuList from './MenuList/MenuList';
import { drawerWidth } from "../../../../store/constant";
import LogoSection from "../LogoSection/LogoSection";
import WebOrMobileBox from "../../../Common/Gui/WebOrMobileBox";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const process = {
    env: {
      REACT_APP_VERSION: '18.2.0'
    }
  };

  const menuContent = (
    <>
      <MenuList/>
      {/*<MenuCard/>*/}
      <Tooltip title="Версия сайта">
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Chip
            label={import.meta.env.VITE_SITE_VERSION}
            disabled
            chipcolor="secondary"
            size="small"
            sx={{ cursor: 'pointer' }}
          />
        </Stack>
      </Tooltip>
    </>
  );

  const drawer = (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
          <LogoSection/>
        </Box>
      </Box>
      <WebOrMobileBox
        mobileComponent={<Box sx={{ px: 2 }}>{menuContent}</Box>}
      >
        <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          {menuContent}
        </PerfectScrollbar>
      </WebOrMobileBox>
    </>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
         aria-label="mailbox folders">
      <Drawer
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
            [ theme.breakpoints.up('md') ]: {
              top: '88px'
            }
          }
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object
};

export default Sidebar;