import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Connexion à la base de données (si ce n'est pas déjà fait)
if (!mongoose.models.User) {
  mongoose.model("User", userSchema);
}

export default mongoose.models.User || mongoose.model("User", userSchema);
