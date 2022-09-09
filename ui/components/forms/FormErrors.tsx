import styled from "styled-components";

const ErrorsListItem = styled.li`
  color: red;
`;
export const FormErrors = ({ errors }: { errors: string[] }) => {
  return (
    errors.length > 0 ? (
      <ul>
        {errors.map((err, i) => (
          <ErrorsListItem key={`${err}_${i}`}>{err}</ErrorsListItem>
        ))}
      </ul>
    ) : null
  );
};
