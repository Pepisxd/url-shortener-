import mongoose from "mongoose";

const DB_URI = "mongodb://localhost:27017/url_shortener";

const initDb = async () => {
  try {
    await mongoose.connect(DB_URI, {});
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error connecting to the database");
    console.error(error);
  }
};

export default initDb; // Usar export default para exportar la función
