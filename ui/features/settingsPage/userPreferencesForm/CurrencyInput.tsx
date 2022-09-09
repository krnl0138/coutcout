import styled from "styled-components";
import { selectUserCurrency } from "../../../../redux/slices/userSlice";
import { userUpdateData } from "../../../../redux/thunks/userThunks";
import { colorDarkPrimary, colorWhitePrimary } from "../../../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.6rem;
`;

const Heading = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: capitalize;
`;

const Option = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  text-transform: uppercase;
`;

export const CurrencyCheckbox = styled.input`
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
export const CurrencyCheckboxLabel = styled.label`
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
    text-transform: uppercase;
  }
`;

export const CurrencyInput = () => {
  const dispatch = useAppDispatch();
  const options = ["usd", "eur", "rub"] as const;
  const userCurrency = useAppSelector(selectUserCurrency);

  return (
    <Container>
      <Heading>Currency:</Heading>
      <Menu aria-label="user-currency-menu">
        {options.map((option) => (
          <MenuItem key={option}>
            <CurrencyCheckbox
              id={`currency-checkbox-${option}`}
              type="checkbox"
              name="currency-checkbox"
              checked={userCurrency === option}
              onChange={() => dispatch(userUpdateData({ currency: option }))}
            />
            <CurrencyCheckboxLabel htmlFor={`currency-checkbox-${option}`}>
              {option}
            </CurrencyCheckboxLabel>
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};
