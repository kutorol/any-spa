import { Box, Stack, Typography } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { getRoleName } from "../../../../../../utils/funcs/role";
import { IUserInterface } from "../../../../../../utils/interfaces/user";
import BreakLine from "./BreakLine";

const NameBlock = () => {
  const { t } = useLaravelReactI18n();
  const user: IUserInterface = useSelector((s: RootState) => s.userInfo.user);
  const sxBox = { px: 2, pt: 2, pb: 0.5 };
  const sxName = { fontWeight: 400 };

  let firstName = user.first_name;
  if (user.uid === 0) {
    firstName = t("Гость");
  }

  return (
    <Box sx={sxBox}>
      <Stack>
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
        >
          <Typography variant="h4">{t("Привет")},</Typography>
          <Typography component="span" variant="h4" sx={sxName}>
            {firstName}
          </Typography>
        </Stack>

        {(user.uid > 0) ? (
          <Typography variant="subtitle2">
            {getRoleName(user.role)} - {user.email}
          </Typography>
        ) : (
          <Typography variant="subtitle2">
            {getRoleName(user.role)}
          </Typography>
        )}

        {(user.uid > 0) && (
          <Typography variant="subtitle2">
            {t("Ваш ID")}: {user.uid}
          </Typography>
        )}
      </Stack>

      <BreakLine/>
    </Box>
  );
};

export default NameBlock;