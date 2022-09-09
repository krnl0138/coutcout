import nookies from "nookies";
import { setCategories } from "../redux/slices/categoriesSlice";
import {
  setCountriesList,
  setCountryCategoriesSpendings,
  setCountrySubcategoriesSpendings,
} from "../redux/slices/countriesSlice";
import { setUser } from "../redux/slices/userSlice";
import { ProtectedRoute } from "../ui/features/protectedRoute/ProtectedRoute";
import { TableCompare } from "../ui/features/tableCompare/TableCompare";
import { TUserResponse } from "../utils/types";

import { firebaseAdmin } from "../firebase/firebaseAdmin";
import { wrapper } from "../redux/store";
import { StyledBlobCompare } from "../ui/components/Blobs";
import { DEFAULT_USER } from "../utils/constants";
import { getErrorMessage } from "../utils/functions";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    let user = {} as TUserResponse;
    try {
      // Verify the user based on the cookie from AuthProvider.
      const cookies = nookies.get(ctx);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const { uid } = token;

      // Retrieve and store the user from @firebase-admin
      const ref = firebaseAdmin.database().ref(`/users/${uid}`);
      await ref.once("value", async (snapshot) => {
        user = await snapshot.val();
      });
      if (!user) throw new Error("No user was returned from a database");
      store.dispatch(setUser({ ...DEFAULT_USER, ...user }));

      // Initialize the bucket from the firebase storage
      const bucket = await firebaseAdmin
        .storage()
        .bucket("coutcout-a3079.appspot.com");

      // fetch and store compare categories for user's filter country
      const countrySpendingsBuffer = await bucket
        .file(`server/countries/${user.countryFilter}/spendings.json`)
        .download();
      const { compareCategories, compareSubcategories } = JSON.parse(
        countrySpendingsBuffer.toString()
      );
      store.dispatch(setCountryCategoriesSpendings(compareCategories));
      store.dispatch(setCountrySubcategoriesSpendings(compareSubcategories));

      // fetch and store countriesList
      const countriesListBuffer = await bucket
        .file("server/countriesList.json")
        .download();
      const { countriesList } = JSON.parse(countriesListBuffer.toString());
      const { countries } = countriesList;
      store.dispatch(setCountriesList(countries));

      // fetch and store categories
      const categoriesBuffer = await bucket
        .file("server/categories.json")
        .download();
      const categories = JSON.parse(categoriesBuffer.toString());
      store.dispatch(setCategories(categories));

      // no need to return anything since
      // we only hydrated the store on the server-side
      return { props: {} };
    } catch (error) {
      // either the `token` cookie didn't exist
      // or token verification failed
      // either way: redirect to the login page
      console.error(getErrorMessage(error));
      return { redirect: { statusCode: 302, destination: "/login" } };
    }
  }
);

const Compare = () => {
  return (
    <ProtectedRoute>
      <TableCompare />
      <StyledBlobCompare />
    </ProtectedRoute>
  );
};
export default Compare;
