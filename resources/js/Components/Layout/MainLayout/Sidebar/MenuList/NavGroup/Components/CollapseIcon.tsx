import * as React from "react";
import Icon from "../../../../../../Common/Gui/Common/Icon";

interface ICollapseIcon {
  isOpen: boolean;
}

const CollapseIcon = ({ isOpen }: ICollapseIcon) => {
  const icon = isOpen ? "IconChevronUp" : "IconChevronDown";
  const style = { marginTop: "auto", marginBottom: "auto" };

  return (
    <Icon
      tablerIcon={icon}
      size="1rem"
      style={style}
    />
  );
};

export default CollapseIcon;