import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { ELogLevel } from "../../../../../utils/enums/admin/logs";
import { IListPreparedLog } from "../../../../../utils/interfaces/admin/logs";
import Icon from "../../../../Common/Gui/Common/Icon";

interface IListHeader {
  handleChange: (event: React.SyntheticEvent, value: string) => void;
  preparedLogs: IListPreparedLog;
}

interface ITabs {
  key: ELogLevel;
  title: string;
  icon: string;
}

const ListHeader = ({ handleChange, preparedLogs }: IListHeader) => {
  const { t } = useLaravelReactI18n();

  const tabs: ITabs[] = [
    { key: ELogLevel.ALL, title: t("Все логи"), icon: "IconWallpaper" },
    { key: ELogLevel.EMERGENCY, title: "Emergency", icon: "IconSos" },
    { key: ELogLevel.ERROR, title: "Error", icon: "IconExclamationCircle" },
    { key: ELogLevel.INFO, title: "Info", icon: "IconInfoOctagon" },
    { key: ELogLevel.DEBUG, title: "Debug", icon: "IconBug" },
    { key: ELogLevel.OTHER, title: t("Остальные"), icon: "IconPhotoExclamation" }
  ];

  return (
    <Box>
      <TabList
        textColor="secondary"
        indicatorColor="secondary"
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {tabs.map((tab: ITabs) => {
          const total = (preparedLogs[tab.key] || []).length;
          if (total === 0) {
            return null;
          }

          const label = `${tab.title} (${total})`;

          return (
            // @ts-ignore
            <Tab
              key={tab.key}
              textColor="secondary"
              onChange={handleChange}
              wrapped
              icon={<Icon tablerIcon={tab.icon}/>}
              iconPosition="start"
              label={label}
              value={tab.key}
            />
          );
        })}
      </TabList>
    </Box>
  );
};

export default ListHeader;