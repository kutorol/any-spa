import { Avatar, Box, ButtonBase, Card, Grid, InputAdornment, OutlinedInput, Popper } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { shouldForwardProp } from "@mui/system";
import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useMatch from "../../../../../hooks/useMatch";
import { RootState } from "../../../../../store/store";
import { IUserInterface } from "../../../../../utils/interfaces/user";
import Icon from "../../../../Common/Gui/Common/Icon";
import Transitions from "../../../../Common/Transitions/Transitions";

// styles
const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: "99%",
  top: "-55px !important",
  padding: "0 12px",
  [theme.breakpoints.down("sm")]: {
    padding: "0 10px"
  }
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  "& input": {
    background: "transparent !important",
    paddingLeft: "4px !important"
  },
  [theme.breakpoints.down("lg")]: {
    width: 250
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 4,
    background: "#fff"
  }
}));

const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  // @ts-ignore
  ...theme.typography.commonAvatar,
  // @ts-ignore
  ...theme.typography.mediumAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  "&:hover": {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

interface IMobileSearch {
  value: string;
  setValue: (v: string) => void;
  popupState: any;
}

const MobileSearch = ({ value, setValue, popupState }: IMobileSearch) => {
  const theme = useTheme();

  return (
    <OutlineInputStyle
      autoFocus
      id="input-mobile-search-header"
      color="secondary"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search"
      startAdornment={
        <InputAdornment position="start">
          <Icon tablerIcon="IconSearch" customColor={theme.palette.grey[500]}/>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <ButtonBase>
            <HeaderAvatarStyle variant="rounded">
              <Icon tablerIcon="IconAdjustmentsHorizontal"/>
            </HeaderAvatarStyle>
          </ButtonBase>
          <Box sx={{ ml: 2 }}>
            <ButtonBase>
              <Avatar
                variant="rounded"
                sx={{
                  // @ts-ignore
                  ...theme.typography.commonAvatar,
                  // @ts-ignore
                  ...theme.typography.mediumAvatar,
                  // @ts-ignore
                  background: theme.palette.orange.light,
                  // @ts-ignore
                  color: theme.palette.orange.dark,
                  "&:hover": {
                    // @ts-ignore
                    background: theme.palette.orange.dark,
                    // @ts-ignore
                    color: theme.palette.orange.light
                  }
                }}
                {...bindToggle(popupState)}
              >
                <Icon tablerIcon="IconX"/>
              </Avatar>
            </ButtonBase>
          </Box>
        </InputAdornment>
      }
    />
  );
};

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  const { bDownSM } = useMatch().breakpoints;
  if (user.uid === 0 || !user.verified_email) {
    return null;
  }

  return (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PopupState
          variant="popper"
          popupId="search-popup-popper"
        >
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase>
                  <HeaderAvatarStyle
                    variant="rounded"
                    {...bindToggle(popupState)}
                  >
                    <Icon tablerIcon="IconSearch"/>
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: "center left" }}>
                      <Card
                        sx={{
                          background: "#fff",
                          [bDownSM]: {
                            border: 0,
                            boxShadow: "none"
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch
                                value={value}
                                setValue={setValue}
                                popupState={popupState}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <OutlineInputStyle
          id="input-search-header"
          color="secondary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Icon tablerIcon="IconSearch" customColor={theme.palette.grey[500]}/>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ButtonBase>
                <HeaderAvatarStyle variant="rounded">
                  <Icon tablerIcon="IconAdjustmentsHorizontal"/>
                </HeaderAvatarStyle>
              </ButtonBase>
            </InputAdornment>
          }
        />
      </Box>
    </>
  );
};

export default SearchSection;