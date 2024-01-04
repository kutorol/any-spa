import { Box, ClickAwayListener, Grid, Paper, Popper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useMatch from "../../../../../hooks/useMatch";
import { createSuccessMgs } from "../../../../../store/reducers/func/snackbar/ok-snackbar";
import { RootState } from "../../../../../store/store";
import redirect from "../../../../../utils/ajax/redirect";
import { ELanguages } from "../../../../../utils/enums/user";
import { __ } from "../../../../../utils/funcs/locale";
import { getCurrentUrlByLocale } from "../../../../../utils/funcs/url";
import { IUserInterface } from "../../../../../utils/interfaces/user";
import userRep from "../../../../../utils/repository/user";
import MainCard from "../../../../Common/MainCard/MainCard";
import Transitions from "../../../../Common/Transitions/Transitions";
import IconBtn from "./IconBtn";
import ListLocales from "./ListLocales";

const LangSection = () => {
  const theme = useTheme();
  const { matchDownMd } = useMatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);

  const anchorRef = useRef(null);
  const prevOpen = useRef(isOpen);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  };


  const onChangeAnonym = (l: ELanguages): void => {
    createSuccessMgs(__("Язык успешно изменен"), 1000);
    setIsOpen(false);
    redirect.toDirectRedirect(getCurrentUrlByLocale(l));
  };

  const onChangeLocale = (l: ELanguages): void => {
    if (user.uid > 0) {
      userRep.changeLocale(l).then((res: boolean) => res && setIsOpen(false));
    } else {
      onChangeAnonym(l);
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = isOpen;
  }, [isOpen]);

  const sxPopper = {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [matchDownMd ? 5 : 0, 20]
        }
      }
    ]
  };

  const popperPlacement = matchDownMd ? "bottom" : "bottom-end";

  const boxSx = {
    ml: 2,
    mr: user.uid === 0 || (user.uid > 0 && !user.verified_email) ? 2 : 0
  };

  return (
    <>
      <Box sx={boxSx}>
        <IconBtn
          anchorRef={anchorRef}
          handleToggle={handleToggle}
        />
      </Box>
      <Popper
        placement={popperPlacement}
        open={isOpen}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={sxPopper}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchDownMd ? "top" : "top-right"} in={isOpen} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* @ts-ignore */}
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <ListLocales onChangeLocale={onChangeLocale}/>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default LangSection;