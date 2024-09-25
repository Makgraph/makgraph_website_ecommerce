import mongoose, { Schema, model } from "mongoose";

// Définir le schéma
const GalleryItemSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ["image", "video"], required: true },
});

// Vérifier si le modèle existe déjà, sinon le créer
const GalleryItem =
  mongoose.models.GalleryItem || model("GalleryItem", GalleryItemSchema);

// Exporter le modèle
export default GalleryItem;
