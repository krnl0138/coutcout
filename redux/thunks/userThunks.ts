import { createAsyncThunk } from "@reduxjs/toolkit";
import { authInterface } from "../../firebase/auth";
import { dbInterface } from "../../lib/api/dbInterface";
import { TLoginFormData } from "../../ui/features/loginForm/LoginForm";
import { TRegisterFormData } from "../../ui/features/registerForm/RegisterForm";
import { getErrorMessage } from "../../utils/functions";
import { TUser } from "../slices/userSlice";
import { AppDispatch, AppThunk, RootState } from "../store";

/** Sign-in the user to `firebase-auth`, then save user data from `db` to the store */
export const userLogin =
  ({ email, password }: TLoginFormData): AppThunk =>
  async (dispatch) => {
    const { authSignInWithEmailPassword } = authInterface();
    const { dbGetUserThunk } = dbInterface();
    try {
      const { uid } = await authSignInWithEmailPassword({ email, password });
      await dispatch(dbGetUserThunk(uid));
    } catch (e) {
      throw new Error(`Login error: ${getErrorMessage(e)}`);
    }
  };

/** Create the user in `firebase-auth`, then create a new `db` entry for them */
export const userRegister =
  ({
    email,
    password,
    username,
  }: Omit<TRegisterFormData, "confirmPassword">): AppThunk =>
  async (dispatch) => {
    const { authCreateUser } = authInterface();
    const { dbWriteUserThunk } = dbInterface();
    try {
      const { uid } = await authCreateUser({ email, password });
      await dispatch(dbWriteUserThunk({ uid, data: { email, username } }));
    } catch (e) {
      throw new Error(`Register error: ${getErrorMessage(e)}`);
    }
  };

/** Update user data in `db`.
 * Update email/password in `firebase-auth` if provided */
type TUserUpdateData = Partial<TUser> & {
  password?: string;
  newPassword?: string;
};
export const userUpdateData =
  ({ password, newPassword, ...data }: TUserUpdateData): AppThunk =>
  async (dispatch) => {
    const { email } = data;
    const { authUpdateEmail, authUpdatePassword } = authInterface();
    const { dbUpdateUserThunk } = dbInterface();
    try {
      if (password && password && email)
        await authUpdateEmail({ password, newEmail: email });
      if (password && newPassword)
        await authUpdatePassword({ password, newPassword });
      await dispatch(dbUpdateUserThunk(data));
    } catch (e) {
      throw new Error(`Update user data error: ${getErrorMessage(e)}`);
    }
  };

/** Upload avatar File to the `firebase-storage` */
export const userUploadAvatar = createAsyncThunk<
  void,
  { file: File },
  { state: RootState; dispatch: AppDispatch }
>("user/uploadAvatar", async ({ file }, { getState, dispatch }) => {
  const { storageUploadAvatarThunk } = dbInterface();
  const { uid } = getState().user;
  try {
    await dispatch(storageUploadAvatarThunk({ uid, file }));
  } catch (e) {
    throw new Error(`Upload avatar error: ${getErrorMessage(e)}`);
  }
});

/** Update the value of category spendings per user in `db`
 * After this pass an update to the store */
export const updateCategorySpendings = createAsyncThunk<
  void,
  { categoryId: string; spendings: number },
  { state: RootState }
>(
  "user/updateCategorySpendings",
  async ({ categoryId: id, spendings }, { dispatch }) => {
    const { dbUpdateCategorySpendingsThunk } = dbInterface();
    try {
      dispatch(dbUpdateCategorySpendingsThunk({ id, spendings }));
    } catch (e) {
      throw new Error(`Update category error: ${getErrorMessage(e)}`);
    }
  }
);

/** Delete the value of category spendings per user in `db` */
export const removeCategorySpendings = createAsyncThunk<
  void,
  { categoryId: string },
  { state: RootState }
>(
  "user/removeCategorySpendings",
  async ({ categoryId: catId }, { dispatch }) => {
    const { dbDeleteCategorySpendingsThunk } = dbInterface();
    try {
      dispatch(dbDeleteCategorySpendingsThunk({ catId }));
    } catch (e) {
      throw new Error(`Update category error: ${getErrorMessage(e)}`);
    }
  }
);

/** Update the value of subcategory spendings per user in `db` */
export const updateSubcategorySpendings = createAsyncThunk<
  void,
  { subcategoryId: string; spendings: number },
  { state: RootState }
>(
  "user/updateSubcategorySpendings",
  async ({ subcategoryId: id, spendings }, { dispatch }) => {
    const { dbUpdateSubcategorySpendingsThunk } = dbInterface();
    try {
      dispatch(dbUpdateSubcategorySpendingsThunk({ id, spendings }));
    } catch (e) {
      throw new Error(`Update subcategory error: ${getErrorMessage(e)}`);
    }
  }
);

/** Delete the value of category spendings per user in `db` */
export const removeSubcategorySpendings = createAsyncThunk<
  void,
  { subcatId: string },
  { state: RootState }
>("user/removeSubcategorySpendings", async ({ subcatId }, { dispatch }) => {
  const { dbDeleteSubcategorySpendingsThunk } = dbInterface();
  try {
    dispatch(dbDeleteSubcategorySpendingsThunk({ subcatId }));
  } catch (e) {
    throw new Error(`Update category error: ${getErrorMessage(e)}`);
  }
});
