import * as firebaseAdmin from "firebase-admin";

import * as serviceAccount from "../secret.json";
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://coutcout-a3079-default-rtdb.europe-west1.firebasedatabase.app",
  });
}
export { firebaseAdmin };
