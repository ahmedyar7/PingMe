import "dotenv/config";
import { app } from "./app.js";
import { connectDb } from "./src/database/connectDb.database.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 3000, (req, res) => {
      console.log(
        `✅ Server is running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("❌ Error connecting the the server");
  });
