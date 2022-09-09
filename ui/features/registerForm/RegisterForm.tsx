import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useReducer } from "react";
import styled from "styled-components";
import z from "zod";
import { userRegister } from "../../../redux/thunks/userThunks";
import { URLS } from "../../../utils/constants";
import { getFormErrorMessages } from "../../../utils/functions";
import { useAppDispatch, useShowErrors } from "../../../utils/hooks";
import { FormButton } from "../../components/forms/FormButton";
import {
  Form,
  FormContainer,
  FormHeading,
  FormSubTitle,
  FormTitle,
} from "../../components/forms/FormContainer";
import { FormErrors } from "../../components/forms/FormErrors";
import { Input } from "../../components/forms/Input";
import { InputLabel } from "../../components/forms/InputLabel";
import { InputPassword } from "../../components/forms/InputPassword";
import { Loader } from "../../components/Loader";
import { registerReducer, initialStateRegister } from "./RegisterFormReducer";

const SignUpButton = styled(FormButton)`
  margin-top: 0.8rem;
`;

export type TRegisterFormData = z.infer<typeof registerFormValidator>;
export const registerFormValidator = z
  .object({
    username: z.string(),
    email: z.string().email({ message: "An email should be a real email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should match",
    path: ["confirm"],
  });

export const RegisterForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchRegister] = useReducer(
    registerReducer,
    initialStateRegister
  );
  const { errors, isLoading, isRegistered, data } = state;
  const { password, confirmPassword, email, username } = data;

  const { showErrors, handleShowErrors } = useShowErrors(errors);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // on each submit reset showErrors value to show new errors
    handleShowErrors(true);
    dispatchRegister({ type: "register" });
    try {
      registerFormValidator.parse(data);
      await dispatch(userRegister(data));
      dispatchRegister({ type: "success" });
      router.push(URLS.about);
    } catch (err) {
      dispatchRegister({ type: "failed", errors: getFormErrorMessages(err) });
    }
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchRegister({
      type: "field",
      field: "username",
      value: e.currentTarget.value,
    });
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchRegister({
      type: "field",
      field: "email",
      value: e.currentTarget.value,
    });
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchRegister({
      type: "field",
      field: "password",
      value: e.currentTarget.value,
    });
  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) =>
    dispatchRegister({
      type: "field",
      field: "confirmPassword",
      value: e.currentTarget.value,
    });

  return (
    <FormContainer>
      <FormHeading>
        <FormSubTitle>Become a member</FormSubTitle>
        <FormTitle>CoûtCoût</FormTitle>
      </FormHeading>
      {isLoading ? (
        <Loader withLabel />
      ) : (
        <Form onSubmit={onSubmit}>
          <InputLabel htmlFor="username">Username:</InputLabel>
          <Input
            required
            id="username"
            type="username"
            value={username}
            onChange={onChangeUsername}
            maxLength={30}
          />
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input
            required
            id="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            maxLength={30}
          />
          <InputLabel htmlFor="register-password">Password:</InputLabel>
          <InputPassword
            id="register-password"
            value={password}
            onChange={onChangePassword}
          />
          <InputLabel htmlFor="register-confirm-password">
            Confirm password:
          </InputLabel>
          <InputPassword
            id="register-confirm-password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            helperTextInvalid="Passwords don't match"
            helperTextValid="Passwords match"
            regex={password ? new RegExp(`^${password}$`) : /''/}
          />
          <SignUpButton variant="filled">Sign Up</SignUpButton>
        </Form>
      )}
      {isRegistered && <p>Successfully registered in. Redirecting..</p>}
      {showErrors && <FormErrors errors={errors} />}
      <p>
        Already have an account?{" "}
        <Link href={URLS.login}>
          <a>Login</a>
        </Link>
      </p>
    </FormContainer>
  );
};
