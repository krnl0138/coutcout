import styled from "styled-components";
import {
  selectUserCurrency,
  selectUserPeriod,
  setUserCurrency,
  toggleUserPeriod,
} from "../../../../redux/slices/userSlice";
import { CURRENCIES_LIST } from "../../../../utils/constants";
import { formatPriceByCurrency } from "../../../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { TableHeader } from "./HeaderRow";

const StyledAccentSpan = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
`;

export const SpendingsCellHeader = () => {
  const dispatch = useAppDispatch();
  const userPeriod = useAppSelector(selectUserPeriod);
  const userCurrency = useAppSelector(selectUserCurrency);
  const getNextCurrency = () => {
    const indexCurrent = CURRENCIES_LIST.indexOf(userCurrency);
    const indexLast = CURRENCIES_LIST.length - 1;
    return indexCurrent === indexLast
      ? CURRENCIES_LIST[0]
      : CURRENCIES_LIST[indexCurrent + 1];
  };
  return (
    <TableHeader>
      Spendings
      <StyledAccentSpan
        onClick={() =>
          dispatch(setUserCurrency({ currency: getNextCurrency() }))
        }
      >
        {formatPriceByCurrency(0, userCurrency, true)},
      </StyledAccentSpan>
      <StyledAccentSpan onClick={() => dispatch(toggleUserPeriod())}>
        {userPeriod}
      </StyledAccentSpan>
    </TableHeader>
  );
};
