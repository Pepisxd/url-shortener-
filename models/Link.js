import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

// Inicializa el plugin de autoincremento
const AutoIncrement = mongooseSequence(mongoose);

// Definición del esquema
const linkSchema = new mongoose.Schema({
  id: { type: Number }, // Campo autoincrementado
  url: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// Aplica el plugin de autoincremento al campo "id"
linkSchema.plugin(AutoIncrement, { inc_field: "id" });

// Exporta el modelo usando export default
const Link = mongoose.model("Link", linkSchema);
export default Link;
