import styled from "styled-components";
import { selectUserPeriod } from "../../../../redux/slices/userSlice";
import { userUpdateData } from "../../../../redux/thunks/userThunks";
import { colorDarkPrimary, colorWhitePrimary } from "../../../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.6rem;
`;

const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: capitalize;
`;

export const PeriodCheckbox = styled.input`
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
export const PeriodCheckboxLabel = styled.label`
  /* styled in SettingsDropdownInput */
`;

const Menu = styled.menu`
  display: flex;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  text-decoration: none;
  label {
    text-transform: capitalize;
  }
`;

export const PeriodInput = () => {
  const dispatch = useAppDispatch();
  const options = ["month", "year"] as const;
  const userPeriod = useAppSelector(selectUserPeriod);

  return (
    <Container>
      <Title>Period:</Title>
      <Menu aria-label="user-period-menu">
        {options.map((option) => (
          <MenuItem key={option}>
            <PeriodCheckbox
              id={`period-checkbox-${option}`}
              type="checkbox"
              name="period-checkbox"
              checked={userPeriod === option}
              onChange={() => dispatch(userUpdateData({ period: option }))}
            />
            <PeriodCheckboxLabel htmlFor={`period-checkbox-${option}`}>
              {option}
            </PeriodCheckboxLabel>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
