import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconLifebuoy, IconLogout, IconSettings } from "@tabler/icons-react";
import { useLaravelReactI18n } from "laravel-react-i18n";
// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// @ts-ignore
import User1 from "../../../../../../assets/images/svg/users/user-round.svg";
import useOpen from "../../../../../hooks/useOpen";
import WebOrMobileBox from "../../../../Common/Gui/WebOrMobileBox";
import MainCard from "../../../../Common/MainCard/MainCard";
import Transitions from "../../../../Common/Transitions/Transitions";
import TechSupport from "../../../../Pages/Special/TechSupport/TechSupport";

const ProfileSection = () => {
  const { t } = useLaravelReactI18n();
  const theme = useTheme();
  // @ts-ignore
  const user = useSelector(s => s.userInfo.user);
  const customization = { borderRadius: 15 };
  const navigate = useNavigate();

  // const [ sdm, setSdm ] = useState(true);
  // const [ value, setValue ] = useState('');
  // const [ notification, setNotification ] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const { isOpen: isOpenSupport, toggle: toggleOpenSupport } = useOpen();

  const onClickSupport = (e?: any) => {
    e && e.preventDefault();
    setOpen(false);
    toggleOpenSupport();
  };

  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);
  const handleLogout = () => navigate("/logout");

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // const handleListItemClick = (event, index, route = '') => {
  //   setSelectedIndex(index);
  //   handleClose(event);
  //
  //   if (route && route !== '') {
  //     navigate(route);
  //   }
  // };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          "&[aria-controls=\"menu-list-grow\"], &:hover": {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            "& svg": {
              stroke: theme.palette.primary.light
            }
          },
          "& .MuiChip-label": {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={user.avatar || User1}
            sx={{
              // @ts-ignore
              ...theme.typography.mediumAvatar,
              margin: "8px 0 8px 8px !important",
              cursor: "pointer"
            }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main}/>}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* @ts-ignore */}
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[ 16 ]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Привет,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {user.first_name}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{user.roleTitle}</Typography>
                    </Stack>
                    {/*<OutlinedInput*/}
                    {/*  sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}*/}
                    {/*  id="input-search-profile"*/}
                    {/*  value={value}*/}
                    {/*  onChange={(e) => setValue(e.target.value)}*/}
                    {/*  placeholder="Search profile options"*/}
                    {/*  startAdornment={*/}
                    {/*    <InputAdornment position="start">*/}
                    {/*      <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[ 500 ]}/>*/}
                    {/*    </InputAdornment>*/}
                    {/*  }*/}
                    {/*  aria-describedby="search-helper-text"*/}
                    {/*  inputProps={{*/}
                    {/*    'aria-label': 'weight'*/}
                    {/*  }}*/}
                    {/*/>*/}
                    <div>&nbsp;</div>
                    <Divider/>
                  </Box>
                  {/*<PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>*/}
                  <Box sx={{ p: 2 }}>
                    {/*<UpgradePlanCard/>*/}
                    {/*<Divider/>*/}
                    {/*<Card*/}
                    {/*  sx={{*/}
                    {/*    bgcolor: theme.palette.primary.light,*/}
                    {/*    my: 2*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <CardContent>*/}
                    {/*    <Grid container spacing={3} direction="column">*/}
                    {/*      <Grid item>*/}
                    {/*        <Grid item container alignItems="center" justifyContent="space-between">*/}
                    {/*          <Grid item>*/}
                    {/*            <Typography variant="subtitle1">Start DND Mode</Typography>*/}
                    {/*          </Grid>*/}
                    {/*          <Grid item>*/}
                    {/*            <Switch*/}
                    {/*              color="primary"*/}
                    {/*              checked={sdm}*/}
                    {/*              onChange={(e) => setSdm(e.target.checked)}*/}
                    {/*              name="sdm"*/}
                    {/*              size="small"*/}
                    {/*            />*/}
                    {/*          </Grid>*/}
                    {/*        </Grid>*/}
                    {/*      </Grid>*/}
                    {/*      <Grid item>*/}
                    {/*        <Grid item container alignItems="center" justifyContent="space-between">*/}
                    {/*          <Grid item>*/}
                    {/*            <Typography variant="subtitle1">Allow Notifications</Typography>*/}
                    {/*          </Grid>*/}
                    {/*          <Grid item>*/}
                    {/*            <Switch*/}
                    {/*              checked={notification}*/}
                    {/*              onChange={(e) => setNotification(e.target.checked)}*/}
                    {/*              name="sdm"*/}
                    {/*              size="small"*/}
                    {/*            />*/}
                    {/*          </Grid>*/}
                    {/*        </Grid>*/}
                    {/*      </Grid>*/}
                    {/*    </Grid>*/}
                    {/*  </CardContent>*/}
                    {/*</Card>*/}
                    {/*<Divider/>*/}
                    <List
                      component="nav"
                      sx={{
                        width: "100%",
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "10px",
                        [ theme.breakpoints.down("md") ]: {
                          minWidth: "100%"
                        },
                        "& .MuiListItemButton-root": {
                          mt: 0.5
                        }
                      }}
                    >
                      {/*<ListItemButton*/}
                      {/*  sx={{ borderRadius: `${customization.borderRadius}px` }}*/}
                      {/*  selected={selectedIndex === 0}*/}
                      {/*  onClick={(event) => handleListItemClick(event, 0, '#')}*/}
                      {/*>*/}
                      {/*  <ListItemIcon>*/}
                      {/*    <IconSettings stroke={1.5} size="1.3rem"/>*/}
                      {/*  </ListItemIcon>*/}
                      {/*  <ListItemText primary={<Typography variant="body2">Account Settings</Typography>}/>*/}
                      {/*</ListItemButton>*/}
                      {/*<ListItemButton*/}
                      {/*  sx={{ borderRadius: `${customization.borderRadius}px` }}*/}
                      {/*  selected={selectedIndex === 1}*/}
                      {/*  onClick={(event) => handleListItemClick(event, 1, '#')}*/}
                      {/*>*/}
                      {/*  <ListItemIcon>*/}
                      {/*    <IconUser stroke={1.5} size="1.3rem"/>*/}
                      {/*  </ListItemIcon>*/}
                      {/*  <ListItemText*/}
                      {/*    primary={*/}
                      {/*      <Grid container spacing={1} justifyContent="space-between">*/}
                      {/*        <Grid item>*/}
                      {/*          <Typography variant="body2">Social Profile</Typography>*/}
                      {/*        </Grid>*/}
                      {/*        <Grid item>*/}
                      {/*          <Chip*/}
                      {/*            label="02"*/}
                      {/*            size="small"*/}
                      {/*            sx={{*/}
                      {/*              bgcolor: theme.palette.warning.dark,*/}
                      {/*              color: theme.palette.background.default*/}
                      {/*            }}*/}
                      {/*          />*/}
                      {/*        </Grid>*/}
                      {/*      </Grid>*/}
                      {/*    }*/}
                      {/*  />*/}
                      {/*</ListItemButton>*/}
                      <ListItemButton
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        selected={selectedIndex === 4}
                        onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem"/>
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">{t("Выйти")}</Typography>}/>
                      </ListItemButton>
                      <Stack sx={{ m: 1 }}/>
                      <Divider/>

                      <ListItemButton
                        sx={{ borderRadius: `${customization.borderRadius}px` }}
                        component={Link}
                        to="/support-tech"
                        onClick={onClickSupport}
                        // onClick={handleLogout}
                      >
                        <ListItemIcon>
                          <IconLifebuoy stroke={1.5} size="1.3rem"/>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <WebOrMobileBox
                              mobileComponent={<Typography variant="body2">{t("Тех. поддержка")}</Typography>}
                            >
                              <Typography variant="body2">
                                {t("Техническая поддержка")}
                              </Typography>
                            </WebOrMobileBox>
                          }
                        />
                      </ListItemButton>
                    </List>
                  </Box>
                  {/*</PerfectScrollbar>*/}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      <TechSupport
        isOpen={isOpenSupport}
        toggle={onClickSupport}
      />
    </>
  );
};

export default ProfileSection;