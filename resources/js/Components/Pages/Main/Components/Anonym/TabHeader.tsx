import { TabList } from "@mui/lab";
import { Box, Divider, Tab } from "@mui/material";
import { useLaravelReactI18n } from "laravel-react-i18n";
import * as React from "react";
import { EMainPageTabs } from "../../../../../utils/enums/user";
import Icon from "../../../../Common/Gui/Common/Icon";

interface ITabHeader {
  onChange: (e: React.SyntheticEvent, newValue: EMainPageTabs) => void;
}

const TabHeader = ({ onChange }: ITabHeader) => {
  const { t } = useLaravelReactI18n();
  return (
    <>
      <Box>
        <TabList
          textColor="secondary"
          indicatorColor="secondary"
          onChange={onChange}
          centered
        >
          {/* @ts-ignore */}
          {Object.values(EMainPageTabs).map((item: EMainPageTabs, i: number) => {
            const isUser = item === EMainPageTabs.USER;
            const itemIcon = isUser ? "IconUser" : "IconUsersGroup";
            const title = t(isUser ? "Пользователям" : "Администраторам");

            return (
              // @ts-ignore
              <Tab
                key={i}
                textColor="secondary"
                wrapped
                icon={<Icon tablerIcon={itemIcon}/>}
                iconPosition="top"
                label={title}
                value={item.toString()}
              />
            );
          })}
        </TabList>
      </Box>

      <Divider/>
    </>
  );
};

export default TabHeader;