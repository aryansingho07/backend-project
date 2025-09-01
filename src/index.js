// ⿡ Load environment variables *before* anything else executes
import "dotenv/config";

// ⿢ Now safely import the rest of the application
import connectDB from "./db/index.js";
import { app } from "./app.js";

// ⿣ Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed !!!", err);
  });