import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

app.listen(5500)
  .on("listening", () => {
    console.log("Server is running on port 5500");
  })
  .on("error", (error) => {
    console.error("Error starting the server:", error.message);
  });

