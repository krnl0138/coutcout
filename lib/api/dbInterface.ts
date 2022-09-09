import { realtimeDbInterface } from "../../firebase/realtimeDb";
import { storageInterface } from "../../firebase/storage";

/** Group up all database-related APIs */
export const dbInterface = () => ({
  ...realtimeDbInterface(),
  ...storageInterface(),
});
