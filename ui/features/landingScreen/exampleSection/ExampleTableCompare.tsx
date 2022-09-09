import styled, { css } from "styled-components";
import Image from "next/image";

const TableContainer = styled.table`
  height: 50rem;
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    minmax(150px, 2.33fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr);
  grid-template-rows: repeat(6, 1fr);
  box-shadow: 0px 4px 16px rgb(0, 0, 0, 0.05);
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);

  thead,
  tbody,
  tr {
    display: contents;
  }
  th,
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TableHeader = styled.th`
  position: sticky;
  top: 0;
  display: flex;
  gap: 1rem;
  align-items: baseline;
  text-align: left;
  font-size: 2.4rem;
  padding: 2.5rem 2.5rem 6rem;

  font-weight: 900;
  &:last-child {
    border: 0;
  }
`;

const TableCategory = styled.td`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 2.5rem;
  font-weight: 700;
`;
const TableSubCategory = styled.td`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-of-type {
    padding: 2.5rem 2.5rem 2.5rem 3.5rem;
  }
  padding: 2.5rem 2.5rem 2.5rem 2.5rem;
`;

const Arrow = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.21115 1.57771C3.94819 0.103611 6.05181 0.103612 6.78885 1.57771L9.55279 7.10557C10.2177 8.43538 9.2507 10 7.76393 10H2.23607C0.749304 10 -0.217687 8.43537 0.447214 7.10557L3.21115 1.57771Z"
        fill="#72D869"
      />
    </svg>
  </div>
);

interface TArrowStyled {
  variant?: "up" | "down" | "expand";
}
const ArrowStyled = styled(Arrow)<TArrowStyled>`
  ${(props) =>
    props.variant === "down"
      ? css`
          transform: rotate(180deg);
          path {
            fill: red;
          }
        `
      : props.variant === "expand"
      ? css`
          transform: rotate(180deg);
          /* stylelint-disable-next-line no-duplicate-selectors */
          path {
            fill: black;
          }
        `
      : ""}
`;

const TableFlagContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 3rem;
  width: 4.3rem;
  /* border: 1px solid black; */
`;

export const ExampleTableCompare = () => {
  return (
    <TableContainer>
      <thead>
        <tr>
          <TableHeader>Category</TableHeader>
          <TableHeader>Spendings</TableHeader>
          <TableHeader>
            Country <ArrowStyled variant="expand" />
          </TableHeader>
          <TableHeader>Compare</TableHeader>
        </tr>
      </thead>

      <tbody>
        <tr>
          <TableCategory>Food</TableCategory>
          <TableCategory>450$</TableCategory>
          <TableCategory>
            <TableFlagContainer>
              <Image
                src="/flags_flat/SVG/brazil@2x.svg"
                alt="brazil flag"
                width="100%"
                height="100%"
                layout="responsive"
              />
            </TableFlagContainer>
          </TableCategory>
          <TableCategory>
            46$ <ArrowStyled variant="up" />
          </TableCategory>
        </tr>
        <tr>
          <TableSubCategory>Groceries</TableSubCategory>
          <TableSubCategory>300$</TableSubCategory>
          <TableSubCategory></TableSubCategory>
          <TableSubCategory>
            40$ <ArrowStyled variant="up" />
          </TableSubCategory>
        </tr>
        <tr>
          <TableSubCategory>Vegetables</TableSubCategory>
          <TableSubCategory>110$</TableSubCategory>
          <TableSubCategory></TableSubCategory>
          <TableSubCategory>
            10$ <ArrowStyled variant="down" />
          </TableSubCategory>
        </tr>
        <tr>
          <TableSubCategory>Fruits</TableSubCategory>
          <TableSubCategory>130$</TableSubCategory>
          <TableSubCategory></TableSubCategory>
          <TableSubCategory>
            16$ <ArrowStyled variant="up" />
          </TableSubCategory>
        </tr>

        <tr>
          <TableCategory>
            Investments <ArrowStyled variant="expand" />
          </TableCategory>
          <TableCategory>1520$</TableCategory>
          <TableCategory>
            <TableFlagContainer>
              <Image
                src="/flags_flat/SVG/brazil@2x.svg"
                alt="Braziln flag"
                width="100%"
                height="100%"
                layout="responsive"
              />
            </TableFlagContainer>
          </TableCategory>
          <TableCategory>
            700$ <ArrowStyled variant="down" />
          </TableCategory>
        </tr>

        <tr>
          <TableCategory>Obligations</TableCategory>
          <TableCategory>1800$</TableCategory>
          <TableCategory>
            <TableFlagContainer>
              <Image
                src="/flags_flat/SVG/brazil@2x.svg"
                alt="Braziln flag"
                width="100%"
                height="100%"
                layout="responsive"
              />
            </TableFlagContainer>
          </TableCategory>
          <TableCategory>
            300$ <ArrowStyled variant="down" />
          </TableCategory>
        </tr>
        <tr>
          <TableSubCategory>Mortgage</TableSubCategory>
          <TableSubCategory>1200$</TableSubCategory>
          <TableSubCategory />
          <TableSubCategory>
            500$ <ArrowStyled variant="down" />
          </TableSubCategory>
        </tr>
        <tr>
          <TableSubCategory>Regular loans</TableSubCategory>
          <TableSubCategory>600$</TableSubCategory>
          <TableSubCategory />
          <TableSubCategory>
            200$ <ArrowStyled variant="up" />
          </TableSubCategory>
        </tr>
      </tbody>
    </TableContainer>
  );
};
