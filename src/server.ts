import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
const PORT = process.env.PORT || 5001;
dotenv.config();
//  start server ->
let server: Server;

async function main() {
  try {
    server = app.listen(PORT, async () => {
      await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.zpuvg.mongodb.net/practice-noteDB?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log("Connected to mongoose with mongodb ✅");
      console.log(`Server is running in port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
