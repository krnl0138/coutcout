import nookies from "nookies";
import { createContext, useState, useEffect, useContext } from "react";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { User } from "../../node_modules/@firebase/auth/dist/auth-public.js";
import { app } from "../../firebase/firebaseClient";

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export const useAuth = () => useContext(AuthContext);

/**
 * Listen for auth token changes in `firebase/auth`.
 * On change pass user object along via 'AuthContext' and
 * set the auth token as a cookie for every request.
 * Force refresh the token every 10 minutes
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        // pass an empty token state to the cookie with every request
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setUser(user);
        // add token to the cookie with every request
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
    // ? check if unsubscribbing works correctly
    return () => unsubscribe();
  }, [auth]);

  // Get new auth token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
