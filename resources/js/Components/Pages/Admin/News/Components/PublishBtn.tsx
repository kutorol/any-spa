import { Grid, Stack } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Btn from "../../../../Common/Gui/Btn/Btn";
import Icon from "../../../../Common/Gui/Common/Icon";

interface IPublishBtn {
  onPublish: (e: React.SyntheticEvent) => void;
  onDelete?: (e: React.SyntheticEvent) => void;
  disabled: boolean;
  title?: string;
  icon?: React.ReactNode;
}

const PublishBtn = ({ title, icon, onPublish, onDelete, disabled }: IPublishBtn) => {
  const { t } = useLaravelReactI18n();
  title = title || t("Обновить новость");
  const titleDel = t("Удалить новость");
  icon = icon || <Icon tablerIcon="IconEdit"/>;
  const justify = onDelete ? "space-between" : "flex-end";

  return (
    <Grid item xs={12} sx={{ mt: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent={justify}>
        {onDelete && (
          <Btn
            color="error"
            variant="contained"
            webTitle={titleDel}
            mobTitle={titleDel}
            icon={<Icon tablerIcon="IconTrash"/>}
            onClick={onDelete}
          />
        )}

        <Btn
          disabled={disabled}
          type="submit"
          variant="contained"
          webTitle={title}
          mobTitle={title}
          icon={icon}
          onClick={onPublish}
        />
      </Stack>
    </Grid>
  );
};

export default PublishBtn;