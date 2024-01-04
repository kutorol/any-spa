import { Avatar, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import User1 from "../../../../../../assets/images/svg/users/user-round.svg";
import useOpen from "../../../../../hooks/useOpen";
import { RootState } from "../../../../../store/store";
import { TOGGLE_SUPPORT_TECH_EVENT } from "../../../../../utils/funcs/event";
import Icon from "../../../../Common/Gui/Common/Icon";
import TechSupport from "../../../../Pages/Special/TechSupport/TechSupport";
import PopupList from "./PopupList";

const ProfileSection = () => {
  const theme = useTheme();
  const user = useSelector((s: RootState) => s.userInfo.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);
  const { isOpen: isOpenSupport, toggle: toggleOpenSupport } = useOpen();

  const _closePopup = (e?: any): void => {
    e && e.preventDefault();
    e && handleClose(e);
  };

  const onClickSupport = (e?: any): void => {
    _closePopup(e);
    toggleOpenSupport();
  };

  const handleClose = (e?: any): void => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  const clickTo = (e: any): void => {
    _closePopup(e);

    let currentElement = e.target;
    while (currentElement && currentElement.tagName !== "A") {
      currentElement = currentElement.parentNode;
    }
    navigate(currentElement.getAttribute("href"));
  };

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && !open) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const onEvenToggleTechSupportDialog = () => onClickSupport();
  useEffect(() => {
    document.addEventListener(TOGGLE_SUPPORT_TECH_EVENT, onEvenToggleTechSupportDialog);
    return () => document.removeEventListener(TOGGLE_SUPPORT_TECH_EVENT, onEvenToggleTechSupportDialog);
  }, []);

  return (
    <>
      <Chip
        sx={{
          height: "48px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.secondary.light,
          backgroundColor: theme.palette.secondary.light,
          "&[aria-controls=\"menu-list-grow\"], &:hover": {
            borderColor: theme.palette.secondary.main,
            background: `${theme.palette.secondary.main}!important`,
            color: theme.palette.secondary.light,
            "& svg": {
              stroke: theme.palette.secondary.light
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
        label={<Icon tablerIcon="IconSettings"/>}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="secondary"
      />

      <PopupList
        isOpen={open}
        anchorRef={anchorRef}
        handleClose={handleClose}
        handleTogglePopup={handleToggle}
        onClickSupport={onClickSupport}
        clickTo={clickTo}
      />

      <TechSupport
        isOpen={isOpenSupport}
        toggle={onClickSupport}
      />
    </>
  );
};

export default ProfileSection;