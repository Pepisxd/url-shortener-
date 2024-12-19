import express from "express";
import initDb from "../config/db.js";
import linkRoutes from "../routes/linkRoutes.js"; // Cambia require por import

const app = express();
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Servidor corriendose 🥵🥵");
});

app.use("/api", linkRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

initDb(); // Inicializa la conexión a la base de datos
