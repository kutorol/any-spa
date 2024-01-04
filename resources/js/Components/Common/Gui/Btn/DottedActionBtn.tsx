import { Box, ClickAwayListener, Grid, Paper, Popper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import useMatch from "../../../../hooks/useMatch";
import { IVariantDottedBtn } from "../../../../utils/interfaces/select";
import MainCard from "../../MainCard/MainCard";
import Transitions from "../../Transitions/Transitions";
import Icon from "../Common/Icon";
import DottedListItems from "./Components/DottedListItems";
import RoundBtn from "./RoundBtn";

interface IDottedActionBtn {
  variants: IVariantDottedBtn[];
}

const DottedActionBtn = ({ variants }: IDottedActionBtn) => {
  const theme = useTheme();
  const { matchDownMd } = useMatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const anchorRef = useRef(null);
  const prevOpen = useRef(isOpen);

  const handleToggle = () => setIsOpen(!isOpen);

  const popperPlacement = matchDownMd ? "bottom" : "bottom-end";
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

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && isOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = isOpen;
  }, [isOpen]);


  const position = matchDownMd ? "top" : "top-right";

  return (
    <>
      <Box>
        <RoundBtn
          icon={<Icon tablerIcon="IconDotsVertical"/>}
          onClick={handleToggle}
          anchorRef={anchorRef}
        />
      </Box>

      <Popper
        placement={popperPlacement}
        open={isOpen}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={sxPopper}
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps }) => (
          <Transitions position={position} in={isOpen} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {/* @ts-ignore */}
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <DottedListItems
                        variants={variants}
                        setIsOpen={setIsOpen}
                      />
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

export default DottedActionBtn;