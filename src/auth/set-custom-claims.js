var admin = require("firebase-admin");

var serviceAccount = require("./buyfreshbro-firebase-adminsdk-9d0in-9b5aa4448e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://buyfreshbro.appspot.com",
});

admin
  .auth()
  .setCustomUserClaims("1mPqzSuaF2XHx2NMUWMBDnG0XM72", { admin: true })
  .then(() => {
    // process.exit();
  })
  .catch((error) => {
    console.log(error);
    // process.exit(1);
  });
