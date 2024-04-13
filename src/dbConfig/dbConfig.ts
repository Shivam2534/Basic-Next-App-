import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL!); // ! used when we know that that value will definatly come
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB Connection Successfull");
    });

    connection.on("error", (error) => {
      console.log("Please make sure DB is UP and Running:", error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while Connection with DB");
    console.log(error);
  }
}
