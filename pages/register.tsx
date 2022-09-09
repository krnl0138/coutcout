import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "../lib/api/authProvider";
import { StyledLoginBlog } from "../ui/components/Blobs";
import { RegisterForm } from "../ui/features/registerForm/RegisterForm";
import { URLS } from "../utils/constants";

const Register = () => {
  // if logged in, redirect
  const router = useRouter();
  const { user } = useAuth();
  // if (user) return router.push(URLS.compare);
  return (
    <>
      <RegisterForm />
      <StyledLoginBlog />
    </>
  );
};
export default Register;
