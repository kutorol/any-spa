import { Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import User1 from "../../../../../assets/images/svg/users/user-round.svg";
import { RootState } from "../../../../store/store";
import { IUserInterface } from "../../../../utils/interfaces/user";
import ImageFullScreen from "./ImageFullScreen";

interface IUserAvatar {
  sx?: (isHover: boolean) => { [key: string]: any };
  src?: string;
  sxCommon?: object;

  [key: string]: any;
}

const UserAvatar = ({ src, sx, sxCommon, ...props }: IUserAvatar) => {
  const theme = useTheme();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [backdropImageUrl, setBackdropImageUrl] = React.useState<null | string>(null);

  const setAvatarSrc = () => setBackdropImageUrl(avatarSrc);
  const onEnter = () => setIsHover(true);
  const onLeave = () => setIsHover(false);

  const avatarSrc = src || user.avatar || User1;

  const avatarSx = {
    ...(sx ? sx(isHover) : {
      // @ts-ignore
      ...theme.typography.mediumAvatar,
      margin: "8px 0px 8px 8px !important",
      cursor: "pointer",
      ...(isHover ? { width: 40, height: 40, zIndex: (theme) => theme.zIndex.drawer } : {})
    }),
    ...(sxCommon ? sxCommon : {})
  };

  return (
    <>
      <Avatar
        src={avatarSrc}
        sx={avatarSx}
        color="inherit"
        onClick={setAvatarSrc}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        {...props}
      />

      <ImageFullScreen
        url={backdropImageUrl}
        setBackdropImageUrl={setBackdropImageUrl}
      />
    </>
  );
};

export default UserAvatar;