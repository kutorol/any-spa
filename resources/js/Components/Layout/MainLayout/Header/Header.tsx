import { Avatar, Box, ButtonBase } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import useMatch from "../../../../hooks/useMatch";
import Icon from "../../../Common/Gui/Common/Icon";
import LogoSection from "../LogoSection/LogoSection";
import LangSection from "./LangSection/LangSection";
import NotificationSection from "./NotificationSection/NotificationSection";
import ProfileSection from "./ProfileSection/ProfileSection";
import SearchSection from "./SearchSection/SearchSection";

interface IHeader {
  handleLeftDrawerToggle: () => void;
}

const Header = ({ handleLeftDrawerToggle }: IHeader) => {
  const theme = useTheme();

  const { bDownMD } = useMatch().breakpoints;
  return (
    <>
      <Box
        sx={{
          width: 228,
          display: "flex",
          [bDownMD]: {
            width: "auto"
          }
        }}
      >
        <ButtonBase sx={{ overflow: "hidden" }}>
          <Avatar
            variant="rounded"
            sx={{
              // @ts-ignore
              ...theme.typography.commonAvatar,
              // @ts-ignore
              ...theme.typography.mediumAvatar,
              transition: "all .2s ease-in-out",
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              "&:hover": {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <Icon tablerIcon="IconMenu2"/>
          </Avatar>
        </ButtonBase>
        <Box
          component="span"
          sx={{
            display: { xs: "none", md: "block" },
            flexGrow: 1,
            ml: 2
          }}
        >
          <LogoSection/>
        </Box>
      </Box>

      <SearchSection/>

      <Box sx={{ flexGrow: 1 }}/>
      <Box sx={{ flexGrow: 1 }}/>


      <LangSection/>
      <NotificationSection/>
      <ProfileSection/>
    </>
  );
};

export default Header;