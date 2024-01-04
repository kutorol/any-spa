import TabPanel from "@mui/lab/TabPanel";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useTheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Icon from "../../../../Common/Gui/Common/Icon";
import MainCard from "../../../../Common/MainCard/MainCard";

interface INotificationPanel {
  value: string;
}

const NotificationPanel = ({ value }: INotificationPanel) => {
  const theme = useTheme();
  const { t } = useLaravelReactI18n();

  return (
    <TabPanel
      value={value}
      sx={{ "&": { p: 0, py: 2 } }}
    >
      <Grid
        container
        sx={{ m: 0, p: 3, pt: 2, color: "#fff" }}
        spacing={0}
      >
        <Grid item xs={12} md={6}>
          {/* @ts-ignore */}
          <MainCard
            boxShadow
            // @ts-ignore
            shadow={theme.shadows[50]}
            sx={{ "& > .MuiCardContent-root": { p: 2 } }}
          >
            <List
              subheader={
                <ListSubheader>
                  <Grid container justifyContent={"space-between"} alignItems={"center"}>
                    {t("Уведомления по E-mail")}

                    <Icon tablerIcon="IconMail"/>
                  </Grid>

                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemIcon>
                  <Icon tablerIcon="IconKey"/>
                </ListItemIcon>
                <ListItemText id="switch-list-label-wifi" primary={t("Системные уведомления")}/>
                <Switch color="secondary" edge="end" disabled checked/>
              </ListItem>
            </List>
          </MainCard>
        </Grid>
      </Grid>
    </TabPanel>
  );
};

export default NotificationPanel;