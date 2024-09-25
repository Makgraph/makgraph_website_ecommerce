import mongoose, { Schema, model } from "mongoose";

// Schéma de la critique
const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// Définir le schéma
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: {
      type: [String], // Tableau de chaînes pour les tailles
      required: false,
    },
    colors: {
      type: [String], // Tableau de chaînes pour les couleurs
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Vérifier si le modèle existe déjà, sinon le créer
const Product = mongoose.models.Product || model("Product", ProductSchema);

// Exporter le modèle
export default Product;
