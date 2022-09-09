import { useState } from "react";
import { TableSettingsDropdown } from "./TableSettingsDropdown";
import { TableSettingsIcon } from "./TableSettingsIcon";

export const TableSettings = () => {
  const [isOpenSettingsDropdown, setIsOpenSettingsDropdown] = useState(false);
  const toggleSettingsDropdown = () =>
    setIsOpenSettingsDropdown(!isOpenSettingsDropdown);

  return (
    <>
      <TableSettingsIcon
        id="table-settings-dropdown"
        onClick={(e) => {
          e.stopPropagation();
          toggleSettingsDropdown();
        }}
      />
      {isOpenSettingsDropdown && (
        <TableSettingsDropdown onCloseDropdown={toggleSettingsDropdown} />
      )}
    </>
  );
};
