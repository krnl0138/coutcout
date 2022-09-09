import {
  createUserWithEmailAndPassword,
  debugErrorMap,
  EmailAuthProvider,
  GoogleAuthProvider,
  initializeAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { z } from "zod";
import { userSchema } from "../redux/slices/userSlice";
import { getErrorMessage } from "../utils/functions";
import { app } from "./firebaseClient";

const passwordSchema = z.string().min(6);

const auth = initializeAuth(app, { errorMap: debugErrorMap });
export const authInterface = () => {
  /**
   * Re-validate the current user in @firebase-auth
   * before performing a security-sensitive action
   */
  const reauthenticate = (oldPassword: string, cb: () => void) => {
    // Grab user from @firebase-auth
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        throw new Error(
          `No user is logged in. ${reauthenticate.name} call cannot be made.`
        );
      }
      if (!user.email) throw new Error("Email is needed for this operation");

      try {
        // Confirm the user provided valid credentials
        await reauthenticateWithCredential(
          user,
          EmailAuthProvider.credential(user.email, oldPassword)
        );
        // Execute the action we need
        await cb();
      } catch (error) {
        throw new Error(
          `Re-authentication failed. Try again. ${getErrorMessage(error)}`
        );
      }
    });
  };

  const authGoogleAuth = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential)
      throw new Error(
        "Something went wrong no credential were provided by Google. Try again."
      );
    return result.user;
  };

  type TAuthCreateUser = z.infer<typeof authCreateUserSchema>;
  const authCreateUserSchema = z.object({
    email: userSchema.shape.email,
    password: passwordSchema,
  });
  const authCreateUser = async ({ email, password }: TAuthCreateUser) => {
    authCreateUserSchema.parse({ email, password });
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  type TAuthSignInWithEmailPassword = z.infer<
    typeof authSignInWithEmailPasswordSchema
  >;
  const authSignInWithEmailPasswordSchema = z.object({
    email: userSchema.shape.email,
    password: passwordSchema,
  });
  const authSignInWithEmailPassword = async ({
    email,
    password,
  }: TAuthSignInWithEmailPassword) => {
    authSignInWithEmailPasswordSchema.parse({ email, password });
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  };

  const authLogout = () => {
    signOut(auth)
      .then(() => alert("You successfully logged out."))
      .catch((e) => {
        throw new Error(
          `An error occured during logout: ${getErrorMessage(e)}`
        );
      });
  };

  type TAuthUpdatePassword = z.infer<typeof authUpdatePasswordSchema>;
  const authUpdatePasswordSchema = z.object({
    password: passwordSchema,
    newPassword: passwordSchema,
  });
  const authUpdatePassword = async ({
    password,
    newPassword,
  }: TAuthUpdatePassword) => {
    authSignInWithEmailPasswordSchema.parse({ password, newPassword });
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        throw new Error(
          `No user is logged in. ${authUpdatePassword.name} call cannot be made.`
        );
      }
      await reauthenticate(password, () => updatePassword(user, newPassword));
    });
  };

  type TAuthUpdateEmail = { password: string; newEmail: string };
  const authUpdateEmail = async ({ password, newEmail }: TAuthUpdateEmail) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        throw new Error(
          `No user is logged in. ${authUpdateEmail.name} call cannot be made.`
        );
      }
      await reauthenticate(password, () => updateEmail(user, newEmail));
    });
  };

  return {
    authCreateUser,
    authSignInWithEmailPassword,
    authGoogleAuth,
    authLogout,
    authUpdateEmail,
    authUpdatePassword,
  };
};
