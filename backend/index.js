import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
const PORT = 8000;
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);

mongoose.connect("mongodb://0.0.0.0:27017/bookDB", { useNewUrlParser: true });

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB!");
});

mongoose.connection.on("close", () => {
  console.log("Disconnected from MongoDB.");
});

mongoose.connection.on("error", (error) => {
  console.log("Error occurred:", error.message);
});

app.use("/books", bookRoute);

app.listen(PORT, () => {
  console.log(`we are running on port ${PORT}`);
});
