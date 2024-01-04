import TabList from "@mui/lab/TabList";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { EFavorite } from "../../../../utils/enums/user";
import Icon from "../../../Common/Gui/Common/Icon";

interface IListHeader {
  handleChange: (event: React.SyntheticEvent, value: EFavorite) => void;
}

interface ITabs {
  title: string;
  value: EFavorite;
  icon: {
    // иконка в обычном состоянии
    common: string;
    // иконка в состоянии редактирования
    edit?: string;
  };
}

const ListHeader = ({ handleChange }: IListHeader) => {
  const { t } = useLaravelReactI18n();

  const tabs: ITabs[] = [
    { title: t("Новости сайта"), icon: { common: "IconPilcrow" }, value: EFavorite.NEWS }
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
          const icon = tab.icon.edit || tab.icon.common;

          return (
            // @ts-ignore
            <Tab
              key={i}
              textColor="secondary"
              onChange={handleChange}
              wrapped
              icon={<Icon tablerIcon={icon}/>}
              iconPosition="start"
              label={tab.title}
              value={tab.value.toString()}
            />
          );
        })}
      </TabList>
    </Box>
  );
};

export default ListHeader;