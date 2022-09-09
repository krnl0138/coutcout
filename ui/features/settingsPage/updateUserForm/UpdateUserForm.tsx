import { useRouter } from "next/router";
import { ChangeEvent, useReducer } from "react";
import styled from "styled-components";
import { z } from "zod";
import {
  selectUserEmail,
  selectUserUsername,
} from "../../../../redux/slices/userSlice";
import { userUpdateData } from "../../../../redux/thunks/userThunks";
import { colorWhiteSecondary } from "../../../../styles/colors";
import { getFormErrorMessages } from "../../../../utils/functions";
import {
  useAppDispatch,
  useAppSelector,
  useShowErrors,
} from "../../../../utils/hooks";
import { FormButton } from "../../../components/forms/FormButton";
import {
  Form,
  FormContainer,
  FormHeading,
  FormSubTitle,
  FormTitle,
} from "../../../components/forms/FormContainer";
import { FormErrors } from "../../../components/forms/FormErrors";
import { Input } from "../../../components/forms/Input";
import { InputLabel } from "../../../components/forms/InputLabel";
import { InputPassword } from "../../../components/forms/InputPassword";
import {
  initialStateUpdateUser,
  UpdateUserReducer,
} from "./UpdateUserFormReducer";

export type TUpdateUserFormData = z.infer<typeof updateUserFormValidator>;
const updateUserFormValidator = z
  .object({
    username: z.string().optional(),
    email: z
      .string()
      .email({ message: "An email should be a real email" })
      .optional(),
    newPassword: z
      .string()
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      })
      .optional(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "Passwords should be different",
    path: ["new-password"],
  });

const UpdateUserFormContainer = styled(FormContainer)`
  position: relative;
  top: 0;
  left: 0;
  transform: translate(0);
  max-width: 50rem;
  &:hover,
  &:focus {
    background-color: ${colorWhiteSecondary};
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  }
  transition: background-color 0.1s, box-shadow 0.1s;
`;

export const UpdateUserForm = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const initialUsername = useAppSelector(selectUserUsername);
  const initialEmail = useAppSelector(selectUserEmail);
  const [state, dispatchForm] = useReducer(UpdateUserReducer, {
    ...initialStateUpdateUser,
    data: {
      username: initialUsername,
      email: initialEmail,
      password: "",
      newPassword: "",
    },
  });
  const { errors, isLoading, isUpdated, data } = state;
  const { password, email, username, newPassword } = data;
  const { showErrors } = useShowErrors(errors);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatchForm({ type: "submit" });
    try {
      updateUserFormValidator.parse(data);
      await dispatch(userUpdateData(data));
      // await dispatch(userChangePassword(data));
      dispatchForm({ type: "success" });
    } catch (err) {
      dispatchForm({ type: "failed", errors: getFormErrorMessages(err) });
    }
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: "field",
      field: "username",
      value: e.currentTarget.value,
    });
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: "field",
      field: "email",
      value: e.currentTarget.value,
    });
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: "field",
      field: "password",
      value: e.currentTarget.value,
    });
  };
  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchForm({
      type: "field",
      field: "newPassword",
      value: e.currentTarget.value,
    });
  };

  return (
    <UpdateUserFormContainer className={className}>
      <FormHeading>
        <FormTitle>Change Your Data</FormTitle>
        <FormSubTitle>Enter the value you want to change</FormSubTitle>
      </FormHeading>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={onSubmit}>
          <InputLabel htmlFor="update-user-username">Username:</InputLabel>
          <Input
            required
            type="update-user-username"
            value={username}
            onChange={onChangeUsername}
            maxLength={30}
          />
          <InputLabel htmlFor="update-user-email">Email:</InputLabel>
          <Input
            required
            type="update-user-email"
            value={email}
            onChange={onChangeEmail}
            maxLength={30}
          />
          <InputLabel htmlFor="update-user-password">
            Password (required):
          </InputLabel>
          <InputPassword
            id="update-user-password"
            value={password}
            onChange={onChangePassword}
          />
          <InputLabel htmlFor="update-user-new-password">
            New password:
          </InputLabel>
          <InputPassword
            required={false}
            id="update-user-new-password"
            value={newPassword}
            onChange={onChangeConfirmPassword}
            helperTextInvalid="Passwords don't match"
            helperTextValid="Passwords match"
            regex={password ? new RegExp(`^${password}$`) : /''/}
          />
          <FormButton variant="filled">Change</FormButton>
        </Form>
      )}
      {/* // !! should be removed on timer  */}
      {isUpdated && <p>Successfully changed your data!</p>}
      {showErrors && <FormErrors errors={errors} />}
    </UpdateUserFormContainer>
  );
};
