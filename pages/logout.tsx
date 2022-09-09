import { useRouter } from "next/router";
import { useEffect } from "react";
import { authInterface } from "../firebase/auth";
import { Loader } from "../ui/components/Loader";
import { URLS } from "../utils/constants";

const Logout = () => {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      const { authLogout } = authInterface();
      await authLogout();
      router.push(URLS.home);
    };
    logout();
  }, [router]);
  return <Loader withLabel />;
};
export default Logout;
