//  db always try catch and async await
import dotenv from "dotenv";
import { app } from "./app.js";
import connextDb from "./db/index.js";

connextDb()
  .then(() => {
    app.listen(9000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log("MOONGO DB CONNECTION FAILED!!", err);
  });
