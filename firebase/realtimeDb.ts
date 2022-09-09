import {
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update
} from "firebase/database";
import { z } from "zod";
import { setUser, TUser, userSchema } from "../redux/slices/userSlice";
import { AppThunk } from "../redux/store";
import { DEFAULT_USER } from "../utils/constants";
import {
  composeObjFromNonEmptyKeys
} from "../utils/functions";
import {
  categorySpendingsSchema,
  subcategorySpendingsSchema,
  TCategorySpendings,
  TSubcategorySpendings
} from "../utils/types";
import { app } from "./firebaseClient";

const db = getDatabase(app);

// Define helper ref funcs to access database locations
const userRef = (userId: TUser["uid"]) => ref(db, `users/${userId}`);
const userCategoryRef = (
  userId: TUser["uid"],
  categoryId: keyof TCategorySpendings
) => ref(db, `users/${userId}/categories/byId/${categoryId}`);
const userSubcategoryRef = (
  userId: TUser["uid"],
  subcategoryId: keyof TSubcategorySpendings
) => ref(db, `users/${userId}/subcategories/byId/${subcategoryId}`);

/** The module describes a communication with `firebase-realime` database */
export const realtimeDbInterface = () => {
  // Notation: type-schema-method

  /** Set up a listener for the user reference.
   * Update the store on every change */
  const dbGetUserThunk =
    (uid: TUser["uid"]): AppThunk =>
    (dispatch) => {
      if (!uid)
        throw new Error(`No UID was provided in ${dbGetUserThunk.name} call`);
      onValue(userRef(uid), (snapshot) => {
        const value = snapshot.val();
        dispatch(setUser({ uid, ...value }));
      });
    };

  type TDbWriteUserThunk = z.infer<typeof dbWriteUserThunkSchema>;
  const dbWriteUserThunkSchema = z.object({
    uid: userSchema.shape.uid,
    data: z
      .object({
        username: userSchema.shape.username,
        email: userSchema.shape.email,
      })
      .strict(),
  });
  const dbWriteUserThunk =
    ({ uid, data }: TDbWriteUserThunk): AppThunk =>
    async (dispatch, getState) => {
      // validate the inputs before access the db
      dbWriteUserThunkSchema.parse({ uid, data });
      const { email, username } = data;
      onValue(
        userRef(uid),
        async (snapshot) => {
          // do not write data if it exists
          if (snapshot.exists())
            throw new Error(
              "Cannot write a new user in the database. The user already exists"
            );
          // compose new user object and write it in the db
          await set(userRef(uid), { ...DEFAULT_USER, email, username, uid });
          // set up a listener and retrieve the user
          await dispatch(dbGetUserThunk(uid));
        },
        { onlyOnce: true }
      );
    };

  type TDbUpdateUserThunk = z.infer<typeof dbUpdateUserThunkSchema>;
  const dbUpdateUserThunkSchema = userSchema
    .omit({ uid: true })
    .partial()
    .strict();
  const dbUpdateUserThunk =
    (data: TDbUpdateUserThunk): AppThunk =>
    async (_, getState) => {
      // validate the inputs before access the db
      dbUpdateUserThunkSchema.parse(data);
      const { uid } = getState().user;
      // Compose 'newUser' object from non-empty fields of 'data'
      // Firebase's 'update' method accepts only an object.
      await update(userRef(uid), composeObjFromNonEmptyKeys(data));
    };

  type TDbUpdateCategoryThunk = z.infer<typeof dbUpdateCategoryThunkSchema>;
  const dbUpdateCategoryThunkSchema = z
    .object({
      id: categorySpendingsSchema.keySchema,
      spendings: categorySpendingsSchema.valueSchema.shape.spendings,
    })
    .strict();
  const dbUpdateCategorySpendingsThunk =
    ({ id, spendings }: TDbUpdateCategoryThunk): AppThunk =>
    async (_, getState) => {
      // validate the inputs before access the db
      dbUpdateCategoryThunkSchema.parse({ id, spendings });
      const { uid } = getState().user;
      // update the value in db
      await update(userCategoryRef(uid, id), { spendings });
    };

  type TDbDeleteCategoryThunk = z.infer<typeof dbDeleteCategoryThunkSchema>;
  const dbDeleteCategoryThunkSchema = z
    .object({ catId: categorySpendingsSchema.keySchema })
    .strict();
  const dbDeleteCategorySpendingsThunk =
    ({ catId: id }: TDbDeleteCategoryThunk): AppThunk =>
    async (dispatch, getState) => {
      // validate the inputs before access the db
      dbUpdateCategoryThunkSchema.parse({ id });
      const { uid } = getState().user;
      // update the value in db
      await remove(userCategoryRef(uid, id));
    };

  type TDbUpdateSubcategoryThunk = z.infer<
    typeof dbUpdateSubcategoryThunkSchema
  >;
  const dbUpdateSubcategoryThunkSchema = z
    .object({
      id: subcategorySpendingsSchema.keySchema,
      spendings: subcategorySpendingsSchema.valueSchema.shape.spendings,
    })
    .strict();
  const dbUpdateSubcategorySpendingsThunk =
    ({ id, spendings }: TDbUpdateSubcategoryThunk): AppThunk =>
    async (_, getState) => {
      // validate the inputs before access the db
      dbUpdateCategoryThunkSchema.parse({ id, spendings });
      const { uid } = getState().user;
      // update the value in db
      await update(userSubcategoryRef(uid, id), { spendings });
    };

  type TDbDeleteSubcategoryThunk = z.infer<
    typeof dbDeleteSubcategoryThunkSchema
  >;
  const dbDeleteSubcategoryThunkSchema = z
    .object({ subcatId: subcategorySpendingsSchema.keySchema })
    .strict();
  const dbDeleteSubcategorySpendingsThunk =
    ({ subcatId: id }: TDbDeleteSubcategoryThunk): AppThunk =>
    async (_, getState) => {
      // validate the inputs before access the db
      dbUpdateSubcategoryThunkSchema.parse({ id });
      const { uid } = getState().user;
      await remove(userSubcategoryRef(uid, id));
    };

  return {
    dbWriteUserThunk,
    dbGetUserThunk,
    dbUpdateUserThunk,
    dbUpdateCategorySpendingsThunk,
    dbDeleteCategorySpendingsThunk,
    dbUpdateSubcategorySpendingsThunk,
    dbDeleteSubcategorySpendingsThunk,
  };
};
