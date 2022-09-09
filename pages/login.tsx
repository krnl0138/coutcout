import { useRouter } from "next/router";
import { useAuth } from "../lib/api/authProvider";
import { StyledLoginBlog } from "../ui/components/Blobs";
import { LoginForm } from "../ui/features/loginForm/LoginForm";

const Login = () => {
  // if logged in, redirect
  const router = useRouter();
  const { user } = useAuth();
  // if (user) return router.push(URLS.compare);

  return (
    <>
      <LoginForm />
      <StyledLoginBlog />
    </>
  );
};
export default Login;
