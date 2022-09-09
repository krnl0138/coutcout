import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useReducer, useState } from "react";
import z from "zod";
import { userLogin } from "../../../redux/thunks/userThunks";
import { URLS } from "../../../utils/constants";
import { getFormErrorMessages } from "../../../utils/functions";
import { useAppDispatch } from "../../../utils/hooks";
import { FormButton } from "../../components/forms/FormButton";
import {
  Form,
  FormContainer,
  FormHeading,
  FormSubTitle,
  FormTitle,
} from "../../components/forms/FormContainer";
import { FormErrors } from "../../components/forms/FormErrors";
import { InputPassword } from "../../components/forms/InputPassword";
import { InputLabel } from "../../components/forms/InputLabel";
import { Input } from "../../components/forms/Input";
import { Loader } from "../../components/Loader";
import { initialStateLogin, loginReducer } from "./LoginFormReducer";

export type TLoginFormData = z.infer<typeof loginFormValidator>;
const loginFormValidator = z.object({
  email: z.string().email({ message: "An email should be a real email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, dispatchLogin] = useReducer(loginReducer, initialStateLogin);
  const { isLoggedIn, isLoading, errors, data } = state;
  const { email, password } = data;

  const [showErrors, setShowErrors] = useState(true);
  useEffect(() => {
    if (errors.length === 0) return;
    setTimeout(() => setShowErrors(false), 3000);
  }, [errors]);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setShowErrors(true);
    dispatchLogin({ type: "login" });
    try {
      loginFormValidator.parse(data);
      await dispatch(userLogin(data));
      dispatchLogin({ type: "success" });
      router.push(URLS.compare);
    } catch (err) {
      console.error(err);
      dispatchLogin({ type: "failed", errors: getFormErrorMessages(err) });
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLogin({
      type: "field",
      inputField: "email",
      value: e.currentTarget.value,
    });
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatchLogin({
      type: "field",
      inputField: "password",
      value: e.currentTarget.value,
    });
  };

  return (
    <FormContainer>
      <FormHeading>
        <FormSubTitle>Welcome back</FormSubTitle>
        <FormTitle>CoûtCoût</FormTitle>
      </FormHeading>
      {isLoading ? (
        <Loader withLabel />
      ) : (
        <Form onSubmit={onSubmit} id="login-form" aria-label="login-form">
          <InputLabel htmlFor="email">Email:</InputLabel>
          <Input
            id="email-input"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
          <InputLabel htmlFor="password-input">Password:</InputLabel>
          <InputPassword
            id="password-input"
            value={password}
            onChange={onChangePassword}
          />
          <FormButton type="submit" variant="filled">
            Login
          </FormButton>
        </Form>
      )}
      {isLoggedIn && <p>Successfully logged in. Redirecting..</p>}
      {showErrors && <FormErrors errors={errors} />}
      <p>
        Are you a new user?{" "}
        <Link href={URLS.register}>
          <a>Register</a>
        </Link>
      </p>
    </FormContainer>
  );
};
