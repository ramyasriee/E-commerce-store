import app from "./app.js";
import { connectMongo } from "./utils/db.js";

const PORT = process.env.PORT || 4000;

connectMongo()
  .then(() => {
    app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT} [MongoDB Connected]`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });