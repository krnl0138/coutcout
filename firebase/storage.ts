import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { z } from "zod";
import { dbInterface } from "../lib/api/dbInterface";
import { setUserAvatar, TUser, userSchema } from "../redux/slices/userSlice";
import { AppThunk } from "../redux/store";
import { app } from "./firebaseClient";

const storage = getStorage(app);

// Define helper ref funcs to access database locations
const avatarByUIDRef = (uid: TUser["uid"]) => ref(storage, `avatars/${uid}`);

export const storageInterface = () => {
  type TStorageUploadAvatar = z.infer<typeof storageUploadAvatarSchema>;
  const storageUploadAvatarSchema = z.object({
    uid: userSchema.shape.uid,
    file: z.instanceof(File),
    withGoogle: z.boolean().optional(),
  });
  const storageUploadAvatarThunk =
    ({ uid, file, withGoogle = false }: TStorageUploadAvatar): AppThunk =>
    async (dispatch) => {
      storageUploadAvatarSchema.parse({ uid, file, withGoogle });
      const { dbUpdateUserThunk } = dbInterface();
      const snapshot = await uploadBytes(avatarByUIDRef(uid), file);
      if (snapshot) {
        const avatar = await getDownloadURL(avatarByUIDRef(uid));
        await dispatch(dbUpdateUserThunk({ avatar }));
      }
    };

  type TStorageDownloadAvatar = z.infer<typeof storageDownloadAvatarSchema>;
  const storageDownloadAvatarSchema = z.object({ uid: userSchema.shape.uid });
  const storageDownloadAvatarThunk =
    ({ uid }: TStorageDownloadAvatar): AppThunk =>
    async (dispatch) => {
      storageDownloadAvatarSchema.parse({ uid });
      const avatar = await getDownloadURL(avatarByUIDRef(uid));
      if (!avatar) throw new Error("No avatar was found in the database.");
      dispatch(setUserAvatar({ avatar }));
    };

  const storageGetCountriesList = async () => {
    const countriesListUrl = await getDownloadURL(
      ref(storage, "server/countriesList.json")
    );
    if (!countriesListUrl)
      throw new Error("No countriesList was found in the database.");
    console.log(countriesListUrl);
    const res = await fetch(countriesListUrl);
    const countriesList = await res.json();
    return countriesList;
  };

  const storageGetCategoriesList = async () => {
    const categoriesListUrl = await getDownloadURL(
      ref(storage, "server/categories.json")
    );
    if (!categoriesListUrl)
      throw new Error("No categories was found in the database.");
    const res = await fetch(categoriesListUrl);
    const categoriesUrl = await res.json();
    return categoriesUrl;
  };

  const storageGetCountrySpendings = async (countryId: string) => {
    const countrySpendingsUrl = await getDownloadURL(
      ref(storage, `server/countries/${countryId}/spendings.json`)
    );
    if (!countrySpendingsUrl)
      throw new Error(
        `No spendings for country id: ${countryId} was found in the database.`
      );
    console.log(countrySpendingsUrl);
    const res = await fetch(countrySpendingsUrl);
    const countrySpendings = await res.json();
    console.log(countrySpendings);
    return countrySpendings;
  };

  return {
    storageUploadAvatarThunk,
    storageDownloadAvatarThunk,
    storageGetCountriesList,
    storageGetCategoriesList,
    storageGetCountrySpendings,
  };
};
