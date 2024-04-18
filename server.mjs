//import all necessary modules
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";

//import routes for different api
import userRoutes from "./routes/routes.mjs";

//dotenv
config();

//making app
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/v1", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`app is running on port no. ${process.env.PORT}`);
});
