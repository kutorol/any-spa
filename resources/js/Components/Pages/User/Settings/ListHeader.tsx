import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import Icon from "../../../Common/Gui/Common/Icon";

interface IListHeader {
  handleChange: (event: React.SyntheticEvent, value: string) => void;
  numEditTab: number;
}

interface ITabs {
  title: string;
  icon: {
    // иконка в обычном состоянии
    common: string;
    // иконка в состоянии редактирования
    edit?: string;
  };
}

const ListHeader = ({ handleChange, numEditTab = 0 }: IListHeader) => {
  const { t } = useLaravelReactI18n();

  const tabs: ITabs[] = [
    { title: t("Личная информация"), icon: { common: "IconUser", edit: "IconPencil" } },
    { title: t("Смена пароля"), icon: { common: "IconLock" } },
    { title: t("Уведомления"), icon: { common: "IconMail" } }
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
        {tabs.map((tab, i: number) => {
          const numTab = i + 1;
          const isEdit = numTab === numEditTab;
          const icon = isEdit ? (tab.icon.edit || tab.icon.common) : tab.icon.common;

          const disabled = !isEdit && numEditTab > 0;

          return (
            // @ts-ignore
            <Tab
              key={i}
              textColor="secondary"
              onChange={handleChange}
              wrapped
              disabled={disabled}
              icon={<Icon tablerIcon={icon}/>}
              iconPosition="start"
              label={tab.title}
              value={(i + 1).toString()}
            />
          );
        })}
      </TabList>
    </Box>
  );
};

export default ListHeader;