import styled from "styled-components";
import {
  selectUserTableOptions,
  toggleUserTableOption,
} from "../../../redux/slices/userSlice";
import { colorDarkPrimary, colorWhitePrimary } from "../../../styles/colors";
import { TABLE_OPTIONS_LIST } from "../../../utils/constants";
import {
  useAppDispatch,
  useAppSelector,
  useOutsideClick,
} from "../../../utils/hooks";

const SettingsDropdownContainer = styled.div`
  position: absolute;
  top: 5%;
  right: 3%;
  max-width: 20rem;
  max-height: 15rem;
  overflow-y: scroll;
  background-color: ${colorWhitePrimary};
  border: 1px solid ${colorDarkPrimary};
  z-index: 20000;
`;

const SettingsDropdownListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: 400;
  list-style: none;
`;

const SettingsDropdownInput = styled.input`
  opacity: 0;
  & + label {
    width: 100%;
    cursor: pointer;
    position: relative;
    display: inline-block;
    font-size: 1.6rem;
    text-transform: capitalize;
    padding-left: 8px;
    margin: 8px 10px;
    line-height: 18px;
    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: -22px;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      outline: 1px solid ${colorDarkPrimary};
    }
  }
  &:checked + label {
    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: -22px;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      background-color: black;
    }
    /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: -14px;
      height: 6px;
      width: 2px;
      transform: rotate(45deg);
      border-bottom: 2px solid ${colorWhitePrimary};
      border-right: 2px solid ${colorWhitePrimary};
      opacity: 1;
      transition: all 0.2s ease;
    }
  }
  &:not(:checked) + label {
    /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: -14px;
      height: 6px;
      width: 2px;
      transform: rotate(45deg);
      border-bottom: 2px solid ${colorWhitePrimary};
      border-right: 2px solid ${colorWhitePrimary};
      opacity: 0;
      transition: all 0.2s ease;
    }
  }
  &:disabled + label {
    color: rgb(110, 110, 110);
    &::before {
      content: "";
      position: absolute;
      top: 1px;
      left: -22px;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      background-color: rgb(110, 110, 110);
    }
  }
`;
export const SettingsDropdownLabel = styled.label`
  /* styled in SettingsDropdownInput */
`;

export const TableSettingsDropdown = ({
  onCloseDropdown,
}: {
  onCloseDropdown: () => void;
}) => {
  const dispatch = useAppDispatch();
  const userOptions = useAppSelector(selectUserTableOptions);
  const refOutsideClick = useOutsideClick(onCloseDropdown);
  return (
    <SettingsDropdownContainer ref={refOutsideClick}>
      <menu aria-label="table-settings-dropdown">
        {TABLE_OPTIONS_LIST.map((option) => (
          <SettingsDropdownListItem key={`settings-dropdown-${option}`}>
            <SettingsDropdownInput
              id={`settings-checkbox-${option}`}
              type="checkbox"
              name="settings-checkbox"
              readOnly={userOptions.includes(option)}
              checked={userOptions.includes(option)}
              disabled={option === "category" || option === "spendings"}
              onClick={() => dispatch(toggleUserTableOption(option))}
            />
            <SettingsDropdownLabel htmlFor={`settings-checkbox-${option}`}>
              {option}
            </SettingsDropdownLabel>
          </SettingsDropdownListItem>
        ))}
      </menu>
    </SettingsDropdownContainer>
  );
};
