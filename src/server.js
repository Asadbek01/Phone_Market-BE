import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import phoneRouter from "../src/service/phone/index.js"
import mongoose from "mongoose";

const server = express();
server.use(express.json());
server.use(cors());



server.use("/phones", phoneRouter)
// server.use("/name", Router);
mongoose.connect(process.env.MONGO_CONNECTION);
const port = process.env.PORT;
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo!");
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.table(listEndpoints(server));
  });
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
