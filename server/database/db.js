import mongoose from "mongoose";

const Connection = async (username,password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.rpcqszq.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("Database Connected");

  } catch (error) {
    console.log("Error while connecting with database", error);
  }
};

export default Connection;