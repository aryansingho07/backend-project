// src/index.js

// 1️⃣ Load .env FIRST before importing anything else
import dotenv from "dotenv";
dotenv.config(); 

// 2️⃣ Import the rest of your modules AFTER env vars are loaded
import connectDB from "./db/index.js";
import { app } from "./app.js";

// 3️⃣ Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed !!!", err);
  });