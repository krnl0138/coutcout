import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../../../lib/api/authProvider";
import { Loader } from "../../components/Loader";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  }, [router, user]);
  if (!user) return <Loader withLabel />;
  return <>{children}</>;
};
